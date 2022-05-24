import { useState, useReducer } from 'react';
import surveyReducer from "../reducers/surveyReducer";
import { actions, initialState } from "../store/store";

const useSurvey = () => {
  const [showSurvey, setShowSurvey] = useState(false);
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
    showSurvey,
    setShowSurvey,
    answerQuestion,
    surveyResults: state.surveyResults
  };
}
 
export default useSurvey;
