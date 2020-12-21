import React, {useState} from 'react';

import Card from './components/Card';
import {Difficulty, fetchQuizQuestions} from './Api';
//types
import {QuestionState} from './Api';

const TOTAL_QUESTIONS: number = 10;

function App() {

  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGameover, setIsGameover] = useState(true);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState([]);

  const startTrivia = async () => {
    setIsLoading(true);
    setIsGameover(false);
    
    const questions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    setQuestions(questions);
    setIsLoading(false);
    setNumber(0);
    setScore(0);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  };

  const nextQuestion = () => {

  };

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  return (
    <div className="App">
      <h1>Zikoko Quiz</h1>
      <button className="start" onClick={startTrivia}>Start</button>
      <p className="score">Score:</p>
      <p>Loading Questions ... </p>
      <Card/>
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
};

export default App;
