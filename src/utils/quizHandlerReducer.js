import questions from "./questions";
const scorePerQuestion = 10;
export const initialState = {
    currentQuestion: 0,
    score: 0,
    answers: [],
    showScoreCard: false,
    maxScore: questions.length * scorePerQuestion
};

export function quizReducer(state, { type, payload = {} }) {
    switch (type) {
        case "SET_Q": {
            const { currentQuestion } = payload;
            return { ...state, currentQuestion };
        }

        case "SAVE_ANSWER_AND_INC_Q": {
            let { currentQuestion,  score, showScoreCard } = state;
            let {answer} = payload;
            if (answer.isCorrect) score = score + scorePerQuestion;

            currentQuestion++;
            if(currentQuestion === questions.length){
                showScoreCard = true
                currentQuestion--;
            }
            
            return { ...state, currentQuestion, score, showScoreCard };
        }

        case "RESET": {
            return initialState;
        }
        default:
            return state;
    }
}
