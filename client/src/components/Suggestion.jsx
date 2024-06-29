import React, { useState, useEffect } from 'react';

// Sample data to simulate API response
const sampleData = {
  additional_considerations: [
    "Limit salt intake due to hypertension",
    "Avoid foods high in histamine, such as fermented foods, to prevent hives",
    "Increase potassium intake through fruits and vegetables to help manage blood pressure"
  ],
  breakfast: [
    "Oatmeal with berries and nuts",
    "Wholewheat toast with avocado and tomatoes",
    "Fruit salad with yogurt"
  ],
  dinners: [
    "Lentil soup with wholewheat bread",
    "Vegetable stirfry with brown rice",
    "Grilled tofu with roasted vegetables"
  ],
  restaurants: [
    "The Green Way, Delhi",
    "Govinda's, Mumbai"
  ],
  workout_plans: [
    "Brisk walking",
    "Cycling",
    "Swimming"
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
