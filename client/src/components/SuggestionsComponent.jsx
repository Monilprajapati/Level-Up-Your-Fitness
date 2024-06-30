import React, { useState, useEffect } from 'react';
// Sample data to simulate API response
const sampleData = {
    "additional_considerations": [
      "Avoid highpotassium foods such as bananas, oranges, and potatoes.",
      "Limit salt intake.",
      "Drink plenty of fluids, especially water.",
      "Monitor blood pressure regularly.",
      "Consult with a healthcare professional before starting any new exercise program."
    ],
    "breakfast": [
      "Idli with sambar",
      "Dosa with coconut chutney",
      "Upma with vegetables"
    ],
    "dinners": [
      "Vegetable biryani with raita",
      "Paneer tikka masala with roti",
      "Dal makhani with rice"
    ],
    "restaurants": [
      "Saravana Bhavan, Chennai",
      "Annapoorna, Bangalore"
    ],
    "workout_plans": [
      "Walking",
      "Swimming",
      "Yoga"
    ]
  };

const capitalizeTitle = (title) => {
  return title
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

const SuggestionsComponent = () => {
  const [data, setData] = useState({
    additional_considerations: [],
    breakfast: [],
    dinners: [],
    restaurants: [],
    workout_plans: []
  });

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(sampleData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">AI Recommendations</h2>
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
    </div>
  );
};

export default SuggestionsComponent;