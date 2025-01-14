// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App'; // This should import the App component correctly
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App /> {/* Render the App component */}
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();



import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+
import './index.css';  // Global Styles
import App from './App';  // Main Application Component
import reportWebVitals from './reportWebVitals';

// Create a root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
