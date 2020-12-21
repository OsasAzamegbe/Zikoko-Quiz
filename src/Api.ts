import {shuffleArray} from './Utils';

enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
};

type Question = {
    category: string;
    correct_answer: string;
    difficulty: Difficulty;
    incorrect_answers: string[];
    type: string;
};

type QuestionState = Question & {answers: string[]};

const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const questions = data.results.map((question: Question): QuestionState => {
        return {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        };
    });
    
    return questions;
}

export type {QuestionState, Question};
export {fetchQuizQuestions, Difficulty};