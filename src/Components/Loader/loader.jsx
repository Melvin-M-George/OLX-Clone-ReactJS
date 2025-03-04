import React from 'react';
import './loader.css'; 

const Loader = () => {
  console.log("loading")
  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      <div className="loader-text">Loading...</div>
    </div>
  );
};

export default Loader;