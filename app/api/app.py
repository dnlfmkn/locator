from flask import Flask, jsonify, json, request, url_for, session, g
import requests
from requests.exceptions import HTTPError
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
app.secret_key = os.urandom(24) #initialize unique session
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize clients
fire_client = FirestoreClient()
gmaps = googlemaps.Client(key=config.PLACES_API_KEY)
firebase = pyrebase.initialize_app(config.firebase_config)

DUMMY_IMAGE = 'https://lh5.googleusercontent.com/p/AF1QipNxDeRVJrbay1xANFPPa \
    _SQhng28RQDvsDWhcz3=w408-h305-k-no'
WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'

@app.route("/api/signin", methods=['POST'])
def signin():
    email = request.args['email']
    password = request.args['password']
    try:
        response = firebase.auth().\
            sign_in_with_email_and_password(email, password)
        session['user_token'] = response['localId']
        return to_json({
            'uid': response['localId'],
            'email': response['email'],
            'display_name': response['displayName']
        })
    except HTTPError as e:
        print(e)

@app.route("/api/signup", methods=['POST'])
def signup():
    email = request.args['email']
    password = request.args['password']
    display_name = request.args['username']
    try:
        user = auth.create_user(email=email, password=password,\
             display_name=display_name)
        session['user_token'] = user.uid
        print(user.uid) #testing
        return to_json({
            'uid': user.uid,
            'email': user.email,
            'display_name': user.display_name,
            'metadata': {
                'creation_date': user.user_metadata.creation_timestamp,
            },
        })
    except Exception as e:
        print(e) 

@app.route('/api/logout', methods=['POST'])
def signout():
    try:
        session.clear()
        return to_json({'success': 'Signed out'}, 200)
    except KeyError:
        print('hit an error')
        return to_json({'error' : 'Failed to sign out'}, 404)
     

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
    user_id = session.get('user_token', None)
    fire_client.collection(u'users').document(user_id)\
    .add(u'bookmarks', location_id)
    return to_json({'success': 'New bookmark added'})      #not sure of this

@app.route("/api/<activity>/<int:location_id>", methods=['DELETE'])
#@login_required
def delete_bookmark(location_id):
    user_id = session.get('user_token', None)
    user = fire_client.collection(u'users').document(user_id)
    if user.collection(u'bookmarks').document(location_id).get().exists
        user.collection(u'bookmarks').document(location_id).delete() 
        return to_json({'success': 'Bookmark deleted'})
    return to_json({'Invalid': 'Bookmark does not exist'})

@app.route("/api/users", methods=['GET'])
def get_user():
    return to_json({k.id: k.to_dict() for k in fire_client.read(u'users')})

def to_json(content, status=200):
    return (json.dumps(content), status, {'content-type': 'application/json'})

if __name__ == "__main__":
    app.run(debug=True)
