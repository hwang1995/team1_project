import axios from 'axios';
axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_PATH}/api/v1`;

// axios.defaults.baseURL = 'http://localhost:8080/api/v1';

export function addAuthHeader(authToken) {
  axios.defaults.headers.common['authToken'] = authToken;
}

export function removeAuthHeader() {
  delete axios.defaults.headers.common['authToken'];
}
