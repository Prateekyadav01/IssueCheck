/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const DisplayImage = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-md overflow-hidden">
        <img src={imageUrl} alt="Full view" className="w-full h-auto max-h-96 object-contain" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-white bg-gray-700 rounded-full p-2 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DisplayImage;
