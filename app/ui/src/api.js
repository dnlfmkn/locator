import axios from 'axios';

/*
This class will handle all API calls to the Flask backend
*/

class APIClient {
  async getActivities() {
    try {
      const response = await axios.get('/', {
        baseURL: 'http://localhost:5000'
      });
      return response.data;
    }
    catch (error) {
      console.log(error); // debug
    }
  }
}

export default APIClient;
