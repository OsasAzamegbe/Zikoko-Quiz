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
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [start, setStart] = useState(false);

  const startQuiz = async () => {
    setIsGameover(false)
    setIsLoading(true);
    setQuestionNumber(0);
    setScore(0);
    setQuestions([]);
    setCorrectAnswers([]);
    setUserAnswers([]);
    setStart(true);
    
    const questions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty);
    
    setCorrectAnswers(questions.map((question: QuestionState) => question.correct_answer))
    setQuestions(questions);
    setIsLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const answer = e.currentTarget.value;
    if (correctAnswers[questionNumber] === answer) setScore(prev => prev + 5);

    setUserAnswers(prev => [...prev, answer]);
  };

  const nextQuestion = () => {
    if (questionNumber === questions.length - 1) {
      setIsGameover(true);
      setStart(false);
    } else{
      setQuestionNumber(prev => prev + 1);
    }    
  };

  const difficultyHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const choice = e.currentTarget.value;
    if (choice === Difficulty.MEDIUM) {
      setDifficulty(Difficulty.MEDIUM);
    } else if (choice === Difficulty.HARD){
      setDifficulty(Difficulty.HARD);
    } else{
      setDifficulty(Difficulty.EASY);
    }

    setStart(true);
  }

  return (
    <div className="App">
      <h1>Zikoko Quiz</h1>
      {
        !start ?
        <div className="difficulty">
          <button value={Difficulty.EASY} onClick={difficultyHandler}>EASY</button>
          <button value={Difficulty.MEDIUM} onClick={difficultyHandler}>MEDIUM</button>
          <button value={Difficulty.HARD} onClick={difficultyHandler}>HARD</button>
        </div>
        : null

      }
      {
        isGameover && start ?
        <button className="start" onClick={startQuiz}>Start</button>
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
          answers={questions[questionNumber].answers}
          userAnswers={userAnswers}
          callback={checkAnswer}
          questionNumber={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          />
        </div>
        : null
      }
      {
        !isGameover && !isLoading && questionNumber === userAnswers.length - 1 ?
        <button className="next" onClick={nextQuestion}>Next Question</button>
        : null
      }
    </div>
  );
};

export default App;
