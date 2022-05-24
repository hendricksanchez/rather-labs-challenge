import { useReducer } from 'react';
import useSurveyContext from '../contexts/surveyContext';
import surveyReducer from "../reducers/surveyReducer";
import { actions, initialState } from "../store/store";
import { asyncForEach, handleCountdown, waitFor } from '../utils/common';
import useWallet from './useWallet';

const useSurvey = () => {
  //hooks
  const {
    submitTransaction,
    getTransactionReceipt
  } = useWallet();
  //contexts
  const {
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
    setWasSurveySubmitted,
  } = useSurveyContext();
  //states
  // const [showSurvey, setShowSurvey] = useState(false);
  // const [showQuestions, setShowQuestions] = useState(false);
  // const [questionNumber, setQuestionNumber] = useState(null);
  // const [showOverview, setShowOverview] = useState(false);
  // const [timeleftProgressBar, setTimeleftProgressBar] = useState(100);
  // const [wasContractSubmitted, setWasContractSubmitted] = useState(false);
  // const [disableButton, setDisableButton] = useState(false);
  //reducer
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  const handlerQuestions = async () => {
    setShowQuestions(true);
    setWasSurveySubmitted(false);
    await asyncForEach(surveyData.questions, async ({lifetimeSeconds}, number) => {
      setTimeleftProgressBar(100);
      setQuestionNumber(number);
      handleCountdown(lifetimeSeconds, lifetimeSeconds, (width) => {
        setTimeleftProgressBar(width);
      });
      await waitFor(lifetimeSeconds);
    })
    setShowQuestions(false);
    setShowOverview(true);
  };

  const answerQuestion = (questionId, answerId) => {
    dispatch({
      type: actions.ANSWER_QUESTION,
      payload: {
        questionId: questionId,
        answerId: parseInt(answerId)
      }
    });
  }

  // const clearAllQuestions = () => {
  //   console.log("state.surveyResults BEFORE", state.surveyResults);
  //   dispatch({
  //     type: actions.CLEAR_ALL_QUESTIONS,
  //     // payload: {
  //     //   questionId: questionId,
  //     //   answerId: parseInt(answerId)
  //     // }
  //   });
  //   console.log("state.surveyResults AFTER", state.surveyResults);
  // }

  const submitSurvey = async () => {
    try {
      const selectedAnswers = state.surveyResults.map((p) => p.answerId);
      console.log("selectedAnswers", selectedAnswers);
      const submittedTrx = await submitTransaction(selectedAnswers);
      console.log("submittedTrx", submittedTrx);
      if (submittedTrx) {
        setWasSurveySubmitted(true);
        getTransactionReceipt(submittedTrx);
      }
    }
    catch (err) {
      setWasSurveySubmitted(false);
      console.log("Error submitting the survey -", err);
    }
  }

  const handlerReloadLocation = () => {
    window.location.reload();
  }

  return {
    surveyData: surveyData,
    setSurveyData: setSurveyData,
    showSurvey: showSurvey,
    setShowSurvey: setShowSurvey,
    answerQuestion,
    handlerQuestions,
    showQuestions: showQuestions,
    questionNumber: questionNumber,
    showOverview: showOverview,
    timeleftProgressBar: timeleftProgressBar,
    surveyResults: state.surveyResults,
    submitSurvey,
    handlerReloadLocation,
    wasSurveySubmitted: wasSurveySubmitted,
    // setWasSurveySubmitted: setWasSurveySubmitted,
  };
}
 
export default useSurvey;
