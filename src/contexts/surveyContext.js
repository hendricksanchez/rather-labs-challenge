import { createContext, useContext, useReducer, useState } from "react";
import surveyReducer from "../reducers/surveyReducer";
import { initialState } from "../store/store";

export const SurveyContext = createContext();

export const SurveyWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(surveyReducer, initialState);
  const [surveyData, setSurveyData] = useState(null);

  const values = {
    surveyData,
    setSurveyData,
    state,
    dispatch
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