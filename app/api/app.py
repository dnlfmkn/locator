from flask import Flask
import json

app = Flask(__name__)

@app.route("/")
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
    return json.dumps(activities)


if __name__ == "__main__":
    app.run(debug=True)
