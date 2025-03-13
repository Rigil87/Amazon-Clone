// Import the React library to enable the creation of a React component
import React from 'react';

// Import the CSS file to apply custom styles to the Banner component
import '../styles/banner.css'; // Ensure the file exists and includes relevant styles for this component

// Define the Banner functional component
function Banner() {
  return (
    // Main container for the banner image, styled using the "banner" class
    <div className="banner">
      {/* Display the banner image */}
      <img
        className="banner__image" // CSS class for styling the image
        src="Banner.jpg"          // Source path for the image file (relative to the public folder or appropriate directory)
        alt="Banner"              // Alternative text to describe the image for accessibility and in case the image fails to load
      />
    </div>
  );
}

// Export the Banner component to make it reusable in other parts of the application
export default Banner;
