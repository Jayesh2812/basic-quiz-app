import questions from "./questions";
const scorePerQuestion = 10;
export const initialState = {
    currentQuestion: 0,
    score: 0,
    answers: {},
    showScoreCard: false,
    maxScore: questions.length * scorePerQuestion,
};

export function quizReducer(state, { type, payload = {} }) {
    switch (type) {
        case "SET_Q": {
            const { currentQuestion } = payload;
            return { ...state, currentQuestion };
        }

        case "SAVE_ANSWER_AND_INC_Q": {
            let { currentQuestion, score, showScoreCard } = state;
            let { answer } = payload;
            if (answer.isCorrect) score = score + scorePerQuestion;

            currentQuestion++;
            if (currentQuestion === questions.length) {
                showScoreCard = true;
                currentQuestion--;
            }

            return { ...state, currentQuestion, score, showScoreCard };
        }

        case "INC_Q": {
            let { currentQuestion } = state;
            currentQuestion++;
            currentQuestion = currentQuestion % questions.length;
            return { ...state, currentQuestion };
        }

        case "DEC_Q": {
            let { currentQuestion } = state;
            currentQuestion--;
            if (currentQuestion < 0) currentQuestion = 0;
            return { ...state, currentQuestion };
        }

        case "SAVE_ANSWER": {
            let { currentQuestion, answers } = state;
            let { answer } = payload;
            answers[currentQuestion] = answer;
            return { ...state, answers };
        }

        case "SUBMIT": {
            let { answers } = state;
            let score = calculateScore(Object.values(answers));
            return { ...state, showScoreCard: true, score };
        }
        case "RESET": {
            return { ...initialState , answers : {}};
        }
        default:
            return state;
    }
}

function calculateScore(answers) {
    return answers.reduce((totalScore, answer) => {
        return totalScore + answer.isCorrect * scorePerQuestion;
    }, 0);
}
