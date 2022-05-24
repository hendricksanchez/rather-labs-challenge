import { actions } from "../store/store";

const surveyReducer = (state, action) => {
  const { type, payload } = action;
  console.log("action.payload", action.payload);
  switch (type) {
    
    case actions.ANSWER_QUESTION:
      const existentQuestion = state.surveyResults.find((q) => q.questionId === payload.questionId);
      if (existentQuestion) {
        const newArray = state.surveyResults;
        newArray.pop();
        return {
          surveyResults: [
            ...newArray,
            {
              questionId: payload.questionId,
              answerId: payload.answerId
            }
          ]
        }
      }
      return {
        surveyResults: [
          ...state.surveyResults,
          {
            questionId: payload.questionId,
            answerId: payload.answerId
          }
        ]
      };

    case actions.CLEAR_ALL_QUESTIONS:
      return {
        surveyResults: []
      };

    default:
      return state.surveyResults;
  }
}
 
export default surveyReducer;