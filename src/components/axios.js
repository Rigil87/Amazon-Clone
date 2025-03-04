import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5001/clone-19c07/us-nam5/api'
});


export default instance;
