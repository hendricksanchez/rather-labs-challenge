import { actions } from "../store/store";

const surveyReducer = (state, action) => {
  const { type, payload } = action;
  console.log("action.payload", action.payload);
  switch (type) {
    
    case actions.ANSWER_QUESTION:
      const existentQuestion = state.surveyResults.find((q) => q.questionId === payload.questionId);
      // console.log("existentQuestion", existentQuestion);
      if (existentQuestion) {
        const newArray = state.surveyResults;
        // console.log("newArray", newArray);
        newArray.pop();
        // console.log("newArray AFTER pop", newArray);
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

    case actions.VIEW_RESULTS:
      console.log("View Results handler...");
      return state;

    default:
      return state.surveyResults;
  }
}
 
export default surveyReducer;