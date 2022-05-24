import { useState, useReducer } from 'react';
import useSurveyContext from '../contexts/surveyContext';
import surveyReducer from "../reducers/surveyReducer";
import { actions, initialState } from "../store/store";
import useWallet from './useWallet';

const useSurvey = () => {
  //survey context
  const { surveyData, setSurveyData } = useSurveyContext();
  const { submitContract } = useWallet();
  //states
  const [showSurvey, setShowSurvey] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [timeleftProgressBar, setTimeleftProgressBar] = useState(100);
  const [wasContractSubmitted, setWasContractSubmitted] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  //reducer
  const [state, dispatch] = useReducer(surveyReducer, initialState);

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const waitFor = (seconds) => new Promise(r => setTimeout(r, seconds * 1000));

  const handlerQuestions = async () => {
    setShowQuestions(true);
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

  const handleCountdown = (timeleft, timetotal, callback) => {
    var progress = (timeleft / timetotal) * 100;
    if (typeof callback == "function") {
      callback(progress);
    }
    if(timeleft > 0) {
      setTimeout(() => {
        handleCountdown(timeleft - 1, timetotal, callback);
      }, 1000);
    }
  }

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
      const submittedContract = await submitContract(selectedAnswers);
      console.log("submittedContract", submittedContract);
      setWasContractSubmitted(true);
      setDisableButton(true);
    }
    catch (err) {
      setWasContractSubmitted(false);
      setDisableButton(false);
    }
  }

  const handlerReloadLocation = () => {
    window.location.reload();
  }

  return {
    surveyData: surveyData,
    setSurveyData: setSurveyData,
    showSurvey,
    setShowSurvey,
    answerQuestion,
    handlerQuestions,
    handleCountdown,
    showQuestions,
    questionNumber,
    showOverview,
    timeleftProgressBar,
    surveyResults: state.surveyResults,
    submitSurvey,
    handlerReloadLocation,
    wasContractSubmitted,
    disableButton
  };
}
 
export default useSurvey;
