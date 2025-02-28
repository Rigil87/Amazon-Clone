import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5001/ecommerce-site-f4b00/us-central1/api'
});

export default instance;
