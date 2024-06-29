import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const QuestionsList = ({ questions, isTrainer, onEditAnswer }) => {
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditClick = (index) => {
    setEditing(index);
    setEditText(questions[index].answer);
  };

  const handleSaveClick = () => {
    onEditAnswer(editing, editText);
    setEditing(null);
  };

  return (
    <div>
      {questions.map((q, index) => (
        <div key={index} className="flex items-center mb-4 p-4 bg-white shadow-md rounded-lg">
          <div className="flex-1">
            <p className="font-semibold">Q: {q.question}</p>
            <p className="mt-1">A: {q.answer}</p>
          </div>
          {isTrainer && (
            <div className="ml-4 flex items-center">
              <FaPencilAlt
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEditClick(index)}
              />
            </div>
          )}
          {editing === index && (
            <div className="flex flex-col mt-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border border-gray-300 rounded p-2 mb-2"
              />
              <button
                className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
