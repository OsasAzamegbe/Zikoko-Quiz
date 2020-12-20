import React from 'react';

type Props = {
    question?: string;
    answer?: string[];
    callback?: any;
    userAnswer?: string;
    questionNumber?: number;
    totalQuestions?: number;
}

const Card: React.FC<Props> = ({
    question, answer,
    callback, userAnswer,
    questionNumber, totalQuestions
}) => {

    return (
        <div>
            Card
        </div>
    );
};

export default Card;