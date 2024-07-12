import React, { useState, useEffect } from "react";
// Sample data to simulate API response


const capitalizeTitle = (title) => {
  return title
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

const SuggestionsComponent = ({ data }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        AI Recommendations
      </h2>
      {data && (
        <>
          {Object.keys(data).map((key) => (
            <div key={key} className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 pl-3">
                {capitalizeTitle(key)}
              </h3>
              <ul className="list-disc pl-10 space-y-2">
                {data[key].length > 0 ? (
                  data[key].map((item, index) => (
                    <li key={index} className="text-gray-600 pl-4">
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No suggestions available.</li>
                )}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SuggestionsComponent;
