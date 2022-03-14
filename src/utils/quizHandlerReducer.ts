import questions from "./questions";
const scorePerQuestion: number = 10;
export interface AnswerInterface {
    answerText: string;
    isCorrect: boolean;
}
export interface initialStateInterface {
    currentQuestion: number;
    score: number;
    answers: { [key: number]: AnswerInterface };
    showScoreCard: boolean;
    maxScore: number;
}

export const initialState: initialStateInterface = {
    currentQuestion: 0,
    score: 0,
    answers: {},
    showScoreCard: false,
    maxScore: questions.length * scorePerQuestion,
};

interface payloadType {
    currentQuestion: number;
}
interface payloadType {
    answer: AnswerInterface;
}

export function quizReducer(
    state: initialStateInterface,
    { type, payload }: { type: string; payload: payloadType }
) {
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
            return { ...initialState, answers: {} };
        }
        default:
            return state;
    }
}

function calculateScore(answers: AnswerInterface[]) {
    return answers.reduce((totalScore, answer) => {
        return totalScore + Number(answer.isCorrect) * scorePerQuestion;
    }, 0);
}
