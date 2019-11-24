import axios from 'axios';

/*
This class will handle all API calls to the Flask backend
*/
const BASE_URL = 'http://localhost:5000'

class APIClient {
  async getActivities() {
    try {
      const response = await axios.get(`${BASE_URL}/api`);
      return response.data;
    }
    catch (error) {
      //TODO: Catch error and display meaningful error page
      console.log(error); // debug
    }
  }

  async getLocations(activity) {
    try {
      const response = await axios.get(`${BASE_URL}/api/${activity}`);
      return response.data;
    }
    catch (error) {
      console.log(error);
    }
  }
}

export default APIClient;
