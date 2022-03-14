import './App.css';
import QuizLayout from './components/QuizLayout';

import { QuizHandlerContextProvider } from './utils/useQuizHandler';
function App() {
  return (
    <QuizHandlerContextProvider>
      <QuizLayout />
    </QuizHandlerContextProvider>
  );
}

export default App;
