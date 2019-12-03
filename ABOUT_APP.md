# locator 🧭
A web app to help you find your interests..

## How to run the app
**Requirements**
* `pip` for Python 3.4 and higher
* `yarn` for the frontend. You can install yarn by following the instructions [here](https://yarnpkg.com/lang/en/docs/install/)
* Python 3.x and higher

**Running the app**
* In the root directory, install the dependencies needed by the server by running: 
`pip install -r requirements.txt`.
* Once this is done, go to the `api` directory and run the Flask server for the app like so: 
`cd app/api && python app.py`
* Once the Flask server is running, go the the `ui` directory and start the development server for the frontend like so: `yarn start`
* The frontend should be running on http://localhost:5000

**Using the app**
* The home page lists activities of interest
* The bookmarks page lists bookmarked locations with regards to certain activitis of interest. This page requires login/signup
* Add and delete bookmarks as needed and find the places you love!