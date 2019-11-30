import axios from 'axios';

/*
This class will handle all API calls to the Flask backend
*/
const BASE_URL = 'http://localhost:5000'
const client = axios.create({
  baseURL: BASE_URL, 
});

class APIClient {
  async getActivities() {
    return this.perform('get', `/api`)
  }

  async getLocations(activity, locationParams) {
    return this.perform('get', `/api/${activity}`, locationParams)
  }

  async addBookmark(activity, locationId) {
    return this.perform('put', `/api/${activity}/${locationId}`);
  }

  async deleteBookmark(activity, locationId) {
    return this.perform('delete', `/api/${activity}/${locationId}`);
  }

  async signup(params) {
    return this.perform('post', `/api/signup`);
  }

  async perform(method, endpoint, data) {
    return client({
      method,
      url: endpoint,
      params: data,
    }).then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
  }
}

export default APIClient;
