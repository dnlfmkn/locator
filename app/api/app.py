from flask import Flask, jsonify
from flask_cors import CORS
#import pyrebase # for working with Firebase

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api", methods=['GET'])
def home():
    # TODO: Put data in key:value pairs of concise name to canonical 
    # name to make fetching results using Places API easier
    activities = [
        "Golf",
        "Swim",
        "Hike",
        "Kayak",
        "Watch a Movie",
        "Go for Karaoke",
        "Bike",
        "Eat",
        "Go to a Spa",
        "Shop",
        "Go to an Arcade",
        "Run",
        "Club",
        "Go-Kart",
        "Sky-Dive",
        "Go to a bar",
        "Dance",
    ]
    return jsonify(activities)

""" Fetches locations for an activity with the help of Places API
    params: activity
"""
@app.route("/api/<activity>", methods=['GET'])
def get_locations(activity):
    return jsonify(['lol'])

# Fetches a user's bookmarks bookmarks
@app.route("/bookmarks", methods=["GET"])
def bookmarks():
    return

@app.route("/<activity>/<int:location_id>", methods=['PUT'])
def add_bookmark(location_id):
    return

@app.route("/<activity>/<int:location_id>", methods=['DELETE'])
def delete_bookmark(location_id):
    return

if __name__ == "__main__":
    app.run(debug=True)
