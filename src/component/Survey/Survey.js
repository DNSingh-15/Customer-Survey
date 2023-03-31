import React, { useState, useEffect } from "react";
import "./Survey.css";

const Survey = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // You can replace this with an API call to get questions from the backend.
    setQuestions([
      {
        id: 1,
        question: "How satisfied are you with our products?",
        type: "rating",
        options: [1, 2, 3, 4, 5],
      },
      {
        id: 2,
        question: "How fair are the prices compared to similar retailers?",
        type: "rating",
        options: [1, 2, 3, 4, 5],
      },
      {
        id: 3,
        question:
          "How satisfied are you with the value for money of your purchase?",
        type: "rating",
        options: [1, 2, 3, 4, 5],
      },
      {
        id: 4,
        question:
          "On a scale of 1-10, how would you recommend us to your friends and family?",
        type: "rating",
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        id: 5,
        question: "What could we do to improve our service?",
        type: "text",
      },
    ]);
  }, []);

  const updateAnswer = (questionId, answer) => {
    const updatedAnswers = answers.filter((a) => a.questionId !== questionId);
    updatedAnswers.push({ questionId, answer });
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    // Save answers to localStorage
    localStorage.setItem("customerSurveyAnswers", JSON.stringify(answers));
    // Reset the answers and go back to the first question
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setFeedback("Thank you for your feedback!");
    setTimeout(() => {
      setFeedback("");
    }, 5000);
  };

  const question = questions[currentQuestionIndex];
  const answer = answers.find((a) => a.questionId === question?.id)?.answer;

  return (
    <div className="survey-container">
      <div className="survey-inner-container">
        <h1>Customer Survey</h1>
        <div className="survey-division">
          <span>
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        {feedback && <div className="feedback">{feedback}</div>}
        {question && (
          <>
            <p>
              {currentQuestionIndex + 1}: {question.question}
            </p>
            {question.type === "rating" && (
              <div className="options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    className={`option ${answer === option ? "selected" : ""}`}
                    onClick={() => updateAnswer(question.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {question.type === "text" && (
              <textarea
                value={answer || ""}
                onChange={(e) => updateAnswer(question.id, e.target.value)}
              />
            )}
            <div className="navigation">
              <button
                className="nav-button"
                disabled={currentQuestionIndex === 0}
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex - 1)
                }
              >
                Prev
              </button>
              <button
                className="nav-button-next"
                disabled={currentQuestionIndex === questions.length - 1}
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }
              >
                Next
              </button>
            </div>
            {currentQuestionIndex === questions.length - 1 && (
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Survey;
