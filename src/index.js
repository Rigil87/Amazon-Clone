import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reducer, { initialState } from "./Reducer";
import { StateProvider } from "./StateProvider";
import { BrowserRouter as Router } from 'react-router-dom';


// Initialize the root of the React application using the `createRoot` method
const root = ReactDOM.createRoot(document.getElementById("root"));
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


