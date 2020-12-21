import React, {useState} from 'react';

import Card from './components/Card';
import {Difficulty, fetchQuizQuestions} from './Api';
//types
import {QuestionState} from './Api';

const TOTAL_QUESTIONS: number = 10;

function App() {

  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameover, setIsGameover] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const startTrivia = async () => {
    setIsGameover(false)
    setIsLoading(true);
    setQuestionNumber(0);
    setScore(0);
    setQuestions([]);
    setCorrectAnswers([]);
    setUserAnswers([]);
    
    const questions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    console.log(questions);
    
    setCorrectAnswers(questions.map((question: QuestionState) => question.correct_answer))
    setQuestions(questions);
    setIsLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const answer = e.currentTarget.value;
    if (correctAnswers[questionNumber] === answer) setScore(prev => prev + 1);

    setUserAnswers(prev => [...prev, answer]);
  };

  const nextQuestion = () => {
    if (questionNumber === questions.length - 1) {
      setIsGameover(true)
    } else{
      setQuestionNumber(prev => prev + 1);
    }    
  };

  return (
    <div className="App">
      <h1>Zikoko Quiz</h1>
      {
        isGameover ?
        <button className="start" onClick={startTrivia}>Start</button>
        : null
      }
      { isLoading ?
        <p>Loading Questions ... </p>
        : null
      }
      {
        !isGameover && !isLoading ?
        <div>
          <p className="score">Score: {score}</p>
          <Card
          question={questions[questionNumber].question}
          answers={correctAnswers}
          userAnswers={userAnswers}
          callback={checkAnswer}
          questionNumber={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          />
        </div>
        : null
      }
      {
        !isGameover && !isLoading && userAnswers.length !== TOTAL_QUESTIONS ?
        <button className="next" onClick={nextQuestion}>Next Question</button>
        : null
      }
    </div>
  );
};

export default App;
