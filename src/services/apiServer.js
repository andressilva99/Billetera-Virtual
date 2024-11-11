// src/services/apiServer.js
import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;
const apiKey = process.env.VUE_APP_API_KEY;

const apiServer = {
  get(endpoint) {
    return axios.get(`${apiUrl}/${endpoint}`, {
      headers: { 'x-apikey': apiKey },
    });
  },

  post(endpoint, data) {
    return axios.post(`${apiUrl}/${endpoint}`, data, {
      headers: { 'x-apikey': apiKey },
    });
  },

  put(endpoint, data) {
    return axios.put(`${apiUrl}/${endpoint}`, data, {
      headers: { 'x-apikey': apiKey },
    });
  },

  delete(endpoint) {
    return axios.delete(`${apiUrl}/${endpoint}`, {
      headers: { 'x-apikey': apiKey },
    });
  },
};

export default apiServer;
