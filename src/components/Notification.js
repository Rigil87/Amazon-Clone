// Import the necessary React library and useEffect hook
import React, { useEffect } from 'react';
import '../styles/notification.css'; // Import the CSS file for styling the component

// Define the Notification functional component with props (message, show, setShow)
const Notification = ({ message, show, setShow }) => {
  // Use the useEffect hook to handle side effects
  useEffect(() => {
    // If the 'show' prop is true, set a timer to hide the notification after 3 seconds
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000);
      // Clear the timer if the component is unmounted or 'show' changes
      return () => clearTimeout(timer);
    }
  }, [show, setShow]); // Dependency array to re-run the effect when 'show' or 'setShow' changes

  // Return the JSX structure for the Notification component
  // Conditionally render the notification based on the 'show' prop
  return show ? (
    <div className="notification">
      {message} {/* Display the notification message */}
    </div>
  ) : null; // Return null if 'show' is false, meaning the notification is not visible
};

// Export the Notification component as the default export
export default Notification;
