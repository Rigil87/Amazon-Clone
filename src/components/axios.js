// Import the axios library, which is used for making HTTP requests
import axios from 'axios';

// Create an instance of axios with a custom configuration
const instance = axios.create({
  // Set the base URL for all HTTP requests made using this axios instance
  baseURL: 'http://127.0.0.1:5001/clone-19c07/us-nam5/api'
});

// Export the axios instance so it can be imported and used in other parts of the application
export default instance;
