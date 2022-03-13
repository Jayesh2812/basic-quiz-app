import React, { useState } from "react";
import useQuizHandler from "../utils/useQuizHandler";
import "../styles/QuizLayout.css";


export default function QuizLayout() {


    const { state: { showScoreCard } } = useQuizHandler()

    return (
        <div className="quiz-layout">
            {!showScoreCard ? (
                <>
                    {/* <QuizNav /> */}
                    <QuizCard />
                </>

            ) : (
                <ScoreCard />
            )}
        </div>
    );
}


function QuizCard() {
    const { dispatch, questions, state: { currentQuestion } } = useQuizHandler()
    const [selectedAnswer, setSelectedAnswer] = useState();
   
    function handleAnswerSubmit(e) {
        dispatch({
            type: "SAVE_ANSWER_AND_INC_Q",
            payload: {
                answer: selectedAnswer
            }
        })
        setSelectedAnswer(null);
    }
    return (
        <div className="question-card">
            <h2 className="question-number">
                Question <span>{currentQuestion + 1}</span>/{questions.length}
            </h2>
            <h2 className="question-text">
                {questions[currentQuestion].questionText}
            </h2>

            <ol className="options">

                {questions[currentQuestion].answers.map((answer, index) => (
                    <Option
                        index={index}
                        key={index}
                        answer={answer}
                        checked={
                            answer.answerText ===
                            selectedAnswer?.answerText
                        }
                        onChange={setSelectedAnswer}
                    />
                ))}
            </ol>

            <button
                className="save-btn btn"
                disabled={!selectedAnswer}
                onClick={handleAnswerSubmit}
            >
                Save And Next
            </button>
        </div>
    )
}


function Option({ answer, index, onChange, checked }) {

    return (
        <li onClick={e => onChange(answer)} className="option">

            <input
                type="radio"
                name="quizAnswer"
                onChange={(e) => onChange(answer)}
                id={`quizAnswer${index}`}
                checked={checked}
            />
            <label htmlFor={`quizAnswer${index}`}>
                {answer.answerText}
            </label>
        </li>
    )
}


function ScoreCard() {
    const { dispatch, state: { score, maxScore } } = useQuizHandler()

    return (
        <div className="score-card">
            <h2 className="score-text">Your score is  <strong>{score}</strong> out of <strong>{maxScore}</strong></h2>
            <button
                className=" start-again-btn btn"
                onClick={(e) => { dispatch({ type: "RESET" }) }}
            >
                Start Again
            </button>
        </div>
    )
}

function QuizNav() {
    const { questions, dispatch } = useQuizHandler()
    const handleClick = currentQuestion => {
        dispatch({ type: "SET_Q", payload: { currentQuestion } })
    }
    return (
        <div className="quiz-nav">
            {questions.map((question, index) => (
                <button className={'btn'} key={index} onClick={e => handleClick(index)}>{index + 1}</button>
            ))}
        </div>
    )
}

