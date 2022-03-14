import React, { createContext, useContext, useReducer } from 'react'
import { quizReducer, initialState, initialStateInterface } from './quizHandlerReducer'
import questions from './questions'

interface QuizHandlerContextInterface  {
    questions: typeof questions,
    state: initialStateInterface,
    dispatch: React.Dispatch<any>

}
const QuizHandlerContext = createContext<QuizHandlerContextInterface>({} as QuizHandlerContextInterface)

function useQuizHandler() {
    return (
        useContext(QuizHandlerContext)
    )
}

export const QuizHandlerContextProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(quizReducer, initialState)
    return (
        <QuizHandlerContext.Provider value={{questions, dispatch, state}}>
            {children}
        </QuizHandlerContext.Provider>
    )
}

export default useQuizHandler