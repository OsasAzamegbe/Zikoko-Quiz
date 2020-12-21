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
    setIsLoading(true);
    setIsGameover(false);
    
    const questions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    
    setCorrectAnswers(questions.map((question: QuestionState) => question.correct_answer))
    setQuestions(questions);
    setIsLoading(false);
    setQuestionNumber(0);
    setScore(0);
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
      setIsLoading(false);
      setQuestionNumber(0);
      setScore(0);
      setQuestions([]);
      setCorrectAnswers([]);
    } else{
      setQuestionNumber(prev => prev + 1);
    }    
  };

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));

  return (
    <div className="App">
      <h1>Zikoko Quiz</h1>
      <button className="start" onClick={startTrivia}>Start</button>
      <p className="score">Score:</p>
      <p>Loading Questions ... </p>
      {/* <Card/> */}
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
};

export default App;
