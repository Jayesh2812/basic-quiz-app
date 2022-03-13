import React from "react";
import useQuizHandler from "../utils/useQuizHandler";
import "../styles/QuizLayout.css";


export default function QuizLayout() {


    const { state: { showScoreCard } } = useQuizHandler()

    return (
        <div className="quiz-layout">
            {!showScoreCard ? (
                <>
                    <QuizNav />
                    <QuizCard />
                </>

            ) : (
                <ScoreCard />
            )}
        </div>
    );
}


function QuizCard() {
    const { dispatch, questions, state: { currentQuestion, answers } } = useQuizHandler()
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
                            answers[currentQuestion]?.answerText === answer.answerText
                        }
                        onChange={answer => dispatch({ type: "SAVE_ANSWER", payload: { answer } })}
                    />
                ))}
            </ol>

            <button
                className="prev-btn btn"
                disabled={currentQuestion === 0}
                onClick={e => dispatch({ type: 'DEC_Q' })}
            >
                Previous
            </button>
            <button
                className="next-btn btn"
                onClick={e => dispatch({ type: 'INC_Q' })}
            >
                Next
            </button>
            <button
                className="submit-btn btn"
                onClick={e => {
                    if (window.confirm("Are you sure?"))
                        dispatch({ type: "SUBMIT" })
                }
                }
            >
                Submit
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
    const { questions, dispatch, state: { answers, currentQuestion } } = useQuizHandler()
    const handleClick = currentQuestion => {
        dispatch({ type: "SET_Q", payload: { currentQuestion } })
    }
    return (
        <div className="quiz-nav">
            {questions.map((question, index) => {
                let classes = ['nav-btn', 'btn']
                if (index === currentQuestion) classes.push('active')
                if (answers[index]) classes.push('answered')
                return (
                    <button className={classes.join(' ')} key={index} onClick={e => handleClick(index)}>{index + 1}</button>
                )
            })}
        </div>
    )
}

