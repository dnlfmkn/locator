from flask import Flask, jsonify, json, request, url_for
from flask_cors import CORS
import config as config
import googlemaps
import pyrebase # for working with Firebase

import sys
import os
sys.path.append(os.path.abspath('../repository'))
from FirestoreClient import FirestoreClient

app = Flask(__name__, static_folder='static')
CORS(app, resources={r"/api/*": {"origins": "*"}})

fire_client = FirestoreClient()
gmaps = googlemaps.Client(key=config.PLACES_API_KEY)

DUMMY_IMAGE = 'https://lh5.googleusercontent.com/p/AF1QipNxDeRVJrbay1xANFPPa \
    _SQhng28RQDvsDWhcz3=w408-h305-k-no'
WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'

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

def get_photo(place_result):
    dir_name = 'static'
    file_id = place_result['id']
    file_name = f'{file_id}.jpg'
    if not os.path.exists(dir_name):
        os.makedirs(dir_name)
    if not os.path.isfile(f'{dir_name}/{file_name}'):
        if place_result.get('photos') is None:
            return #best to return url to some placeholder image
        photo = gmaps.places_photo(place_result['photos'][0]['photo_reference'], max_width=400)
        with open(os.path.join(dir_name, file_name), 'wb') as photo_file:
            for chunk in photo:
                if chunk:
                    photo_file.write(chunk)
    return url_for('static', filename=file_name)


""" Fetches locations for an activity with the help of Places API
    params: activity
"""
@app.route("/api/<activity>", methods=['GET'])
def get_locations(activity):
    # dummy response for testing/to avoid making to many requests
    if ('dummy' in request.args):
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
    for result in results:
        result.update({'photo_url': get_photo(result)}) 
    return to_json(results)

# Fetches a user's bookmarks
@app.route("/api/bookmarks", methods=["GET"])
def bookmarks():
    return

@app.route("/api/<activity>/<int:location_id>", methods=['PUT'])
def add_bookmark(location_id):
    return

@app.route("/api/<activity>/<int:location_id>", methods=['DELETE'])
def delete_bookmark(location_id):
    return

@app.route("/api/users", methods=['GET'])
def get_user():
    return to_json({k.id: k.to_dict() for k in fire_client.read(u'users')})

def to_json(content, status=200):
    return (json.dumps(content), status, {'content-type': 'application/json'})

if __name__ == "__main__":
    app.run(debug=True)
