import { useState, useReducer } from 'react';
import useSurveyContext from '../contexts/surveyContext';
import surveyReducer from "../reducers/surveyReducer";
import { actions, initialState } from "../store/store";

const useSurvey = () => {
  //survey context
  const { surveyData, setSurveyData } = useSurveyContext();
  //states
  const [showSurvey, setShowSurvey] = useState(false);
  //reducer
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  const answerQuestion = (questionId, answerId) => {
    dispatch({
      type: actions.ANSWER_QUESTION,
      payload: {
        questionId: questionId,
        answerId: parseInt(answerId)
      }
    });
  }

  return {
    surveyData: surveyData,
    setSurveyData: setSurveyData,
    showSurvey,
    setShowSurvey,
    answerQuestion,
    surveyResults: state.surveyResults
  };
}
 
export default useSurvey;
