enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    return 10
}

export {fetchQuizQuestions, Difficulty};