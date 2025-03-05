// Define the reportWebVitals function, which takes an optional onPerfEntry callback function as an argument
const reportWebVitals = onPerfEntry => {
  // Check if onPerfEntry is a function before proceeding
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library to measure and report web performance metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each web vitals function with the onPerfEntry callback to report the corresponding metric
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry); // First Input Delay
      getFCP(onPerfEntry); // First Contentful Paint
      getLCP(onPerfEntry); // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

// Export the reportWebVitals function as the default export
export default reportWebVitals;
