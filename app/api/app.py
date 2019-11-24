from flask import Flask, jsonify, json
from flask_cors import CORS
import config
import pyrebase # for working with Firebase

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?'

@app.route("/api", methods=['GET'])
def home():
    # TODO: Put data in key:value pairs of concise name to canonical 
    # name to make fetching results using Places API easier
    activities = ["Golf", "Swim", "Hike", "Kayak", "Watch a Movie",\
        "Go for Karaoke", "Bike", "Eat", "Go to a Spa", "Shop", \
        "Go to an Arcade", "Run", "Club", "Go-Kart", "Sky-Dive", \
        "Go to a bar", "Dance"]
    return jsonify(activities)

""" Fetches locations for an activity with the help of Places API
    params: activity
"""
@app.route("/api/<activity>", methods=['GET'])
def get_locations(activity):
    # dummy response
    return to_json([{
        "location_id": 1,
        "img_url": 'https://lh5.googleusercontent.com/p/AF1QipNxDeRVJrbay1xANFPPa_SQhng28RQDvsDWhcz3=w408-h305-k-no',
        "title": 'A Lovely Place',
        "distance": 200,
        "bookmarked": True,
    }])

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

def to_json(content, status=200):
    return (json.dumps(content), status, {'content-type': 'application/json'})
if __name__ == "__main__":
    app.run(debug=True)
