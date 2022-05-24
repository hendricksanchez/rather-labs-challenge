import { createContext, useContext, useReducer, useState } from "react";
import surveyReducer from "../reducers/surveyReducer";
import { initialState } from "../store/store";

export const SurveyContext = createContext();

export const SurveyWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(surveyReducer, initialState);
  const [surveyData, setSurveyData] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [timeleftProgressBar, setTimeleftProgressBar] = useState(100);
  const [wasSurveySubmitted, setWasSurveySubmitted] = useState(false);

  const values = {
    state,
    dispatch,
    surveyData,
    setSurveyData,
    showSurvey,
    setShowSurvey,
    showQuestions,
    setShowQuestions,
    questionNumber,
    setQuestionNumber,
    showOverview,
    setShowOverview,
    timeleftProgressBar,
    setTimeleftProgressBar,
    wasSurveySubmitted,
    setWasSurveySubmitted
  }

  return <SurveyContext.Provider
    value={values}>
      {children}
    </SurveyContext.Provider>
}

const useSurveyContext = () => {
  return useContext(SurveyContext);
}

export default useSurveyContext;