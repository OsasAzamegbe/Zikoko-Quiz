import React from 'react';

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswers: string[];
    questionNumber: number;
    totalQuestions: number;
}

const Card: React.FC<Props> = ({
    question, answers,
    callback, userAnswers,
    questionNumber, totalQuestions
}) => {

    return (
        <div>
            <p className="question-number">Question {questionNumber} / {totalQuestions}</p>
            <p className="question">{question}</p>
            {
                answers.map((answer, index)=> (
                <button 
                key={index}
                onClick={callback} 
                disabled={userAnswers.length === questionNumber ? true: false} 
                value={answer[questionNumber - 1]}>
                    {answer[questionNumber - 1]}
                </button>))
            }
            
        </div>
    );
};

export default Card;