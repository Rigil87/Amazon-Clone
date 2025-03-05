// Import the necessary React library and other required modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the CSS file for styling the application
import App from './App'; // Import the main App component
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import service worker registration for offline capabilities
import reducer, { initialState } from './Reducer'; // Import the reducer and initial state for global state management
import { StateProvider } from './StateProvider'; // Import the StateProvider component for context API
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing

// Initialize the root of the React application using the `createRoot` method
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the App component with the StateProvider to manage global state */}
    <StateProvider initialState={initialState} reducer={reducer}>
      {/* Wrap the App component with Router for routing */}
      <Router>
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>
);

// Register the service worker for offline capabilities and faster loading times
serviceWorkerRegistration.register();
