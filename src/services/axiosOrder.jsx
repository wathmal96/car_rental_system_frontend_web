import axios from "axios";

const token = localStorage.getItem('login')

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });

  export default instance;