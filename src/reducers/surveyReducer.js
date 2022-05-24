import { actions } from "../store/store";

const surveyReducer = (state, action) => {
  const { type, payload } = action;
  console.log("action.payload", action.payload);
  switch (type) {
    
    case actions.ANSWER_QUESTION:
      // console.log("state.surveyResults BEFORE", state.surveyResults);
      // const answeredQuestion = state.surveyResults.map((q) => q.questionId === payload.questionId);
      // const othersQuestions = state.surveyResults.filter((q) => q.questionId !== payload.questionId);
      // console.log("othersQuestions", othersQuestions);
      // const aqui = {
      //   surveyResults: [
      //     othersQuestions,
      //     // ...state.surveyResults,
      //     {
      //       questionId: payload.questionId,
      //       answerId: payload.answerId
      //     }
      //   ]
      // };
      // console.log("aqui", aqui);
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
      // const newArray = [...state.surveyResults];
      // newArray.splice(newArray.indexOf(payload.questionId), 1);
      // const existentQuestion = state.surveyResults.map((question) => {
      //   return question.questionId === action.payload.questionId
      //     ? { ...question, answerId: action.payload.answerId }
      //     : { questionId: payload.questionId, answerId: payload.answerId }
      //   });
      // console.log("answeredQuestion", answeredQuestion);
      // console.log("answeredQuestion.length", answeredQuestion.length > 0);
      // if (answeredQuestion.length == 0) {
      //   console.log("inserting...");
      //   return {
      //     surveyResults: [
      //       ...state.surveyResults,
      //       {
      //         questionId: payload.questionId,
      //         answerId: payload.answerId
      //       }
      //     ]
      //   };
      // }
      // console.log("repetido!");
      // return state;
      // console.log("state.surveyREsults AFTER", [...state.surveyResults, existentQuestion]);

    case actions.VIEW_RESULTS:
      console.log("View Results handler...");
      return state;

    default:
      return state.surveyResults;
      // throw new Error("There was not a default handler for the request");
  }
}
 
export default surveyReducer;