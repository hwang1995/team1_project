import axios from 'axios';

axios.defaults.baseURL = 'http://sungwookteam1.iptime.org:8081/healthcare/api/v1';
// axios.defaults.baseURL = `http://${window.location.hostname}:8080/api/v1`;

export function addAuthHeader(authToken) {
    axios.defaults.headers.common['authToken'] = authToken;
}

export function removeAuthHeader() {
    delete axios.defaults.headers.common['authToken'];
}