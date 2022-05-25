import { useEffect } from "react";
import useSurvey from "../hooks/useSurvey";
import SurveyResults from "./SurveyResults";
import Message from "./Message";
import SurveyQuestions from './SurveyQuestions';

const Survey = () => {
  const {
    surveyData,
    handlerQuestions,
    showQuestions,
    showOverview,
    surveyResults,
  } = useSurvey();

  useEffect(() => {
    handlerQuestions();
  }, []);

  if (!surveyData?.questions) return '';
  
  return (
    <>
      <div className="flex flex-wrap lg:w-1/2 sm:w-full flex-col py-5">
        {showQuestions && (
          <SurveyQuestions
            questions={surveyData.questions}
          />
        )}
        {showOverview && !showQuestions && (
          <>
            <Message>
              <span className="text-center text-4xl font-bold">The survey is over, here are the results...</span>
            </Message>
            <SurveyResults
              surveyResults={surveyResults}
              surveyData={surveyData}
            />
          </>
        )}
      </div>
    </>
  );
}
 
export default Survey;