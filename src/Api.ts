enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;    
}

export {fetchQuizQuestions, Difficulty};