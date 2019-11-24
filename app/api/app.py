from flask import Flask, jsonify
from flask_cors import CORS
#import pyrebase # for working with Firebase

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api", methods=['GET'])
def home():
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

@app.route("/api/<activity>", methods=['GET'])
def get_locations(activity):
    return
@app.route("/bookmarks", methods=["GET"])
def bookmarks():
    return
@app.route("/<activity>/<int:location_id>", methods=['PUT'])
def add_bookmark(location_id):
    return


if __name__ == "__main__":
    app.run(debug=True)
