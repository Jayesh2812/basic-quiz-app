import React, { createContext, useContext, useReducer } from 'react'
import { quizReducer, initialState } from './quizHandlerReducer'
import questions from './questions'
const QuizHandlerContext = createContext()

function useQuizHandler() {
    return (
        useContext(QuizHandlerContext)
    )
}

export function QuizHandlerContextProvider({children}) {
    const [state, dispatch] = useReducer(quizReducer, initialState)
    return (
        <QuizHandlerContext.Provider value={{questions, dispatch, state}}>
            {children}
        </QuizHandlerContext.Provider>
    )
}

export default useQuizHandler