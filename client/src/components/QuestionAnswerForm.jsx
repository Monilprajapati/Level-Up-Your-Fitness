import React, { useState } from 'react';

const QuestionAnswerForm = ({ isTrainer, onAskQuestion, onSubmitAnswer, currentQuestionId }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (question.trim()) {
      onAskQuestion(question);
      setQuestion('');
    }
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (answer.trim() && currentQuestionId !== null) {
      onSubmitAnswer(currentQuestionId, answer);
      setAnswer('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      {isTrainer ? (
        <form onSubmit={handleSubmitAnswer} className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-2">Submit an Answer</h3>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="p-2 border border-gray-300 rounded-lg resize-none"
            rows="4"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit Answer
          </button>
        </form>
      ) : (
        <form onSubmit={handleAskQuestion} className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold mb-2">Ask a Question</h3>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Write your question here..."
            className="p-2 border border-gray-300 rounded-lg resize-none"
            rows="4"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ask Question
          </button>
        </form>
      )}
    </div>
  );
};

export default QuestionAnswerForm;
