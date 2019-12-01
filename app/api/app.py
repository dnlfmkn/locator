from flask import Flask, jsonify, json, request, url_for, session
from flask_cors import CORS
import appconfig as config
import googlemaps
import firebase_admin
from firebase_admin import credentials, auth, firestore
from geopy.distance import distance
from middleware import login_required
import pyrebase # for working with Firebase

import sys
import os
sys.path.append(os.path.abspath('../repository'))
from FirestoreClient import FirestoreClient

app = Flask(__name__, static_folder='static')
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize clients
fire_client = FirestoreClient()
gmaps = googlemaps.Client(key=config.PLACES_API_KEY)
firebase = pyrebase.initialize_app(config.firebase_config)
cred = credentials.Certificate(config.firebase_config['serviceAccount'])
firebase_admin.initialize_app(cred, {
    'project_id': 'locator-257401'
})

DUMMY_IMAGE = 'https://lh5.googleusercontent.com/p/AF1QipNxDeRVJrbay1xANFPPa \
    _SQhng28RQDvsDWhcz3=w408-h305-k-no'
WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'

@app.route("/api/signup", methods=['POST'])
def signup():
    email = request.args['email']
    password = request.args['password']
    display_name = request.args['username']
    try:
        user = auth.create_user(email=email, password=password,\
             display_name=display_name)
        session['user_token'] = user.uid
        misc_data = {
            'fn': request.args['firstname'],
            'ln': request.args['lastname']
        }
        try:
            firestore.client().collection(u'users').\
                document(user.uid).set(misc_data)
        except Exception as e:
            print('Failed to update user data: {}'.format(e))
        print(user.uid) #testing
        return to_json({'success': 'Created user'})
    except Exception as e:
        print(e) 
     

@app.route("/api", methods=['GET'])
def home():
    # TODO: Put data in key:value pairs of concise name to canonical 
    # name to make fetching results using Places API easier
    # This will involve some manual curation.
    activities = ["Golf", "Swim", "Hike", "Kayak", "Watch a Movie",\
        "Go for Karaoke", "Bike", "Eat", "Go to a Spa", "Shop", \
        "Go to an Arcade", "Run", "Club", "Go-Kart", "Sky-Dive", \
        "Go to a bar", "Dance"]
    return jsonify(activities)

# will defer this to a background thread
def get_photo(place_result):
    dir_name = 'static'
    file_id = place_result['id']
    file_name = f'{file_id}.jpg'
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    if not os.path.isfile(f'{dir_name}/{file_name}'):
        if place_result.get('photos') is None:
            return #best to return url to some placeholder image
        # download the image
        photo = gmaps.places_photo(place_result['photos'][0]['photo_reference'], max_width=100)
        with open(os.path.join(dir_name, file_name), 'wb') as photo_file:
            for chunk in photo:
                if chunk:
                    photo_file.write(chunk)
    url = url_for('static', filename=file_name)
    return f'http://localhost:5000{url}' #hardcoded ❌

def get_bookmarked(place_id):
    return False #for now

def get_distance(place_result, current_coords):
    location = place_result['geometry']['location']
    place_coords = (location['lat'], location['lng'])
    return round(distance(place_coords, current_coords).miles, 2)

""" Fetches locations for an activity with the help of Places API
    params: activity
"""
@app.route("/api/<activity>", methods=['GET'])
def get_locations(activity):
    # dummy response for testing/to avoid making to many requests
    if (request.args.get('dummy') is not None):
        return to_json([{
        "location_id": 1,
        "img_url": DUMMY_IMAGE,
        "title": 'A Lovely Place',
        "distance": 200,
        "bookmarked": False,
        }])
    location = (request.args['lat'], request.args['long'])
    response = gmaps.places_nearby(location=location, keyword=activity, open_now=True, \
        rank_by='distance')
    results = response['results']
    refined_results = [] #so much wastage, it hurts
    for result in results:
        refined_results.append({
            "location_id": result['id'],
            "img_url": get_photo(result),
            "title": result['name'],
            "distance": get_distance(result, location),
            "bookmarked": get_bookmarked(result['id']),
        })
    return to_json(refined_results)

# Fetches a user's bookmarks
@app.route("/api/bookmarks", methods=["GET"])
#@login_required
def bookmarks():
    users = fire_client.read(u'users')
    return to_json(list(users))

@app.route("/api/<activity>/<int:location_id>", methods=['PUT'])
#@login_required
def add_bookmark(location_id):
    user_bookmarks = fire_client.collection(u'users').document(insert_user_id_here)\
    .add(u'bookmarks', data)
    return to_json(user_bookmarks)      #not sure of this

@app.route("/api/<activity>/<int:location_id>", methods=['DELETE'])
@login_required
def delete_bookmark(location_id):
    return

@app.route("/api/users", methods=['GET'])
def get_user():
    return to_json({k.id: k.to_dict() for k in fire_client.read(u'users')})

def to_json(content, status=200):
    return (json.dumps(content), status, {'content-type': 'application/json'})

if __name__ == "__main__":
    app.run(debug=True)
