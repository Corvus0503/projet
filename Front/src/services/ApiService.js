import axios from 'axios';

const baseURL = 'http://localhost:8080/api/'; 

const apiService = axios.create({
  baseURL,
});

const get = (url, params) => apiService.get(url, { params });
const post = (url, data) => apiService.post(url, { params }, data);
const update = (url, id, data) => apiService.put(url, { params }, data);
const delet = (url, id) => apiService.delete(url, id);


export { get, post, update, delet };