import React from 'react';

import Card from './components/Card';


function App() {

  const startTrivia = async () => {

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  };

  const nextQuestion = () => {

  };

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
