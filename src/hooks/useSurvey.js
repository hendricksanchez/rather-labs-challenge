import { useReducer } from 'react';
import useSurveyContext from '../contexts/surveyContext';
import surveyReducer from "../reducers/surveyReducer";
import { actions, initialState } from "../store/store";
import { asyncForEach, handleCountdown, waitFor } from '../utils/common';
import useWallet from './useWallet';
import { useEffect } from 'react';

const useSurvey = () => {
  //hooks
  const {
    submitTransaction,
    checkForTokenBalance
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
    surveyResults,
    setSurveyResults
  } = useSurveyContext();
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

  const submitSurvey = async () => {
    try {
      const selectedAnswers = surveyResults.map((p) => p.answerId);
      const submittedTrx = await submitTransaction(selectedAnswers);
      if (submittedTrx) {
        setWasSurveySubmitted(true);
        // getTransactionReceipt(submittedTrx);
        await checkForTokenBalance();
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

  useEffect(() => {
    if (state?.surveyResults.length > 0) {
      setSurveyResults(state.surveyResults);
    }
  }, [state.surveyResults]);

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
    surveyResults,
    submitSurvey,
    handlerReloadLocation,
    wasSurveySubmitted: wasSurveySubmitted
  };
}
 
export default useSurvey;
