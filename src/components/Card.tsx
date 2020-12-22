import React from 'react';
import './Card.css';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswers: string[];
    questionNumber: number;
    totalQuestions: number;
    correctAnswers: string[];
}

const Card: React.FC<Props> = ({
    question, answers,
    callback, userAnswers,
    questionNumber, totalQuestions, correctAnswers
}) => {

    return (
        <div className="card">
            <p className="question-number">Question {questionNumber} / {totalQuestions}</p>
            <p className="question" dangerouslySetInnerHTML={{ __html: question}} />
            <div className="options-wrapper">
                {
                    answers.map((answer, index)=> (
                    <button 
                    className={`options ${
                        userAnswers.length === questionNumber ? 
                        correctAnswers[questionNumber - 1] === answer ?
                            "green"
                            : "red"
                        : null
                    }`}
                    key={index}
                    onClick={callback} 
                    disabled={userAnswers.length === questionNumber ? true: false} 
                    value={answer} dangerouslySetInnerHTML={{ __html: answer}}  />))
                }
            </div>            
        </div>
    );
};

export default Card;