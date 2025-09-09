import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Add this line
import './App.css'; // Keep this line if you want the default styles
import App from './App';
import './tailwind.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();