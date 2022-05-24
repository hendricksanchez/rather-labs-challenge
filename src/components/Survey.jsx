import { useEffect } from "react";
import Alert from "./Alert";
import Button from "./Button";
import useSurvey from "../hooks/useSurvey";
import { alerts } from '../utils/const';

const Survey = () => {
  const {
    surveyData,
    answerQuestion,
    handlerQuestions,
    showQuestions,
    questionNumber,
    showOverview,
    timeleftProgressBar,
    surveyResults,
    submitSurvey,
    handlerReloadLocation,
    wasSurveySubmitted
  } = useSurvey();

  useEffect(() => {
    handlerQuestions();
  }, []);

  if (!surveyData?.questions) return '';
  
  return (
    <>
      <div className="flex flex-wrap lg:w-1/2 sm:w-full flex-col py-5">
        
        {showQuestions && (
          <form>
            <div className="shadow-lg lg:max-w-full lg:flex">
              <div className="lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l" style={{ backgroundImage: `url(${surveyData.questions[questionNumber].image})`, backgroundSize: 'cover'}}></div>
              <div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                <div className="p-4">
                  <div>
                    <p className="text-gray-900 text-center font-bold text-3xl">{surveyData.questions[questionNumber].text}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="py-8 px-6">
                      <ul>
                        {surveyData.questions[questionNumber].options.map((option, index) => {
                          return (
                            <li key={index} className="flex flex-row items-center py-2">
                              <input
                                className="w-4 h-4 border-gray-300 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                type="radio"
                                id={`${surveyData.questions[questionNumber].text}-${index}`}
                                name={surveyData.questions[questionNumber].text}
                                value={index}
                                onChange={(e) => answerQuestion(questionNumber, e.target.value)}
                              />
                              <label
                                htmlFor={`${surveyData.questions[questionNumber].text}-${index}`}
                                className="block ml-2 text-xl text-gray-900 dark:text-gray-500"
                              >
                                {option.text}
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-1.5 dark:bg-gray-400">
                  <div className={`bg-blue-600 h-1.5`} style={{ width: `${timeleftProgressBar}%` }}></div>
                </div>
              </div>
            </div>
          </form>
        )}
        {showOverview && !showQuestions && (
          <div className="flex flex-col justify-center items-center">
            <p className="text-4xl font-bold pt-8 pb-12">
              The survey is over, here are the results...
            </p>
            
            <div className="flex flex-col mb-10">
              {JSON.stringify(surveyResults)}
              {surveyResults.length === surveyData.questions.length
                ? (
                    <>
                      <ul>
                        {surveyData.questions.map((question, index) => {
                          return (
                            <li key={index} className="flex flex-row items-center py-2">
                              <span className="text-xl font-semibold">{question.text}{' => '}{question.options[surveyResults[index]?.answerId].text}</span>
                            </li>
                          )
                        })}
                      </ul>
                      <Button
                        type='button'
                        title={!wasSurveySubmitted ? 'Submit your answers' : 'Survey submitted'}
                        onClick={() => submitSurvey()}
                        disable={wasSurveySubmitted} />
                    </>
                  )
                : (
                    <>
                      <Alert
                        type={alerts.WARNING}
                        title='Not all the survey questions were answered! '
                        subtitle='It is required to answer all the questions of the survey.' />
                      <Button
                        type='button'
                        title='Restart the survey'
                        onClick={() => handlerReloadLocation()}
                      />
                    </>
                  )
              }
            </div>
            
          </div>
        )}

      </div>
    </>
  );
}
 
export default Survey;