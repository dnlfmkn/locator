import axios from 'axios';

/*
This class will handle all API calls to the Flask backend
*/
const BASE_URL = 'http://localhost:5000'
const client = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true,
});

class APIClient {
  async getActivities() {
    return this.perform('get', `/api`)
  }

  async getLocations(activity, locationParams) {
    return this.perform('get', `/api/${activity}`, locationParams)
  }

  async getBookmarks() {
    return this.perform('get', `/api/bookmarks`)
  }

  async addBookmark(activity, locationId) {
    return this.perform('post', `/api/${activity}/${locationId}`);
  }

  async deleteBookmark(activity, locationId) {
    return this.perform('delete', `/api/${activity}/${locationId}`);
  }

  async signup(params) {
    return this.perform('post', `/api/signup`, params);
  }

  async signin(email, password) {
    return this.perform('post', `/api/signin`, {
      email: email,
      password: password,
    });
  }

  async signout() {
    return this.perform('post', `/api/logout`)
  }

  async perform(method, endpoint, data) {
    return client({
      method,
      url: endpoint,
      params: data,
    }).then((response) => response.data)
    .catch((error) => {
      throw error
    })
  }
}

export default APIClient;
