import React, { useState } from 'react';
import QuestionAnswerForm from './QuestionAnswerForm';
import QuestionsList from './QuestionsList';
import { useUser } from '../contexts/userContext'; // Import the custom hook

const TrainerQuestionAnswer = () => {
  const { user } = useUser(); // Get user data from context
  const isTrainer = user?.role === 'trainer'; // Check if the user is a trainer

  const [questions, setQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  const handleAskQuestion = (questionText) => {
    setQuestions([...questions, { question: questionText, answer: '' }]);
  };

  const handleEditAnswer = (questionId, answerText) => {
    const updatedQuestions = questions.map((q, index) =>
      index === questionId ? { ...q, answer: answerText } : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Questions and Answers</h2>
      <QuestionAnswerForm
        isTrainer={isTrainer}
        onAskQuestion={handleAskQuestion}
        onSubmitAnswer={() => {}}
        currentQuestionId={null}
      />
      <QuestionsList
        questions={questions}
        isTrainer={isTrainer}
        onEditAnswer={handleEditAnswer}
      />
    </div>
  );
};

export default TrainerQuestionAnswer;
