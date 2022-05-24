import { useState, useEffect } from "react";
import useSurvey from "../hooks/useSurvey";

const Survey = ({ questions, handleSubmitSurvey }) => {
  //custom hook
  const {
    answerQuestion,
    surveyResults
  } = useSurvey();
  //states
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [timeleftProgressBar, setTimeleftProgressBar] = useState(100);
  
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const waitFor = (seconds) => new Promise(r => setTimeout(r, seconds * 1000));

  const handlerQuestions = async () => {
    setShowQuestions(true);
    await asyncForEach(questions, async ({lifetimeSeconds}, number) => {
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

  useEffect(() => {
    handlerQuestions();
    // console.log("questions", questions);
    // console.log("dataDePrueba", dataDePrueba);
    // setShowQuestions(false);
    // setShowOverview(true);
  }, []);

  // useEffect(() => {
  //   if (showOverview && !showQuestions && surveyResults) {
  //     console.log("surveyResults", surveyResults);
  //     results = surveyResults.map((p) => p.answerId);
  //     console.log("results", results);
  //   }
  // }, [showOverview, showQuestions, surveyResults]);

  if (!questions) return '';
  
  return (
    <>
      <div className="flex flex-wrap w-full flex-col py-5">
        
        {showQuestions && (
          <form>
            <div className="shadow-lg lg:max-w-full lg:flex">
              <div className="lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l" style={{ backgroundImage: `url(${questions[questionNumber].image})`, backgroundSize: 'cover'}}></div>
              <div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                <div className="p-4">
                  <div>
                    <p className="text-gray-900 text-center font-bold text-3xl">{questions[questionNumber].text}</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="py-8 px-6">
                      <ul>
                        {questions[questionNumber].options.map((option, index) => {
                          return (
                            <li key={index} className="flex flex-row items-center py-2">
                              <input
                                className="w-4 h-4 border-gray-300 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                type="radio"
                                id={`${questions[questionNumber].text}-${index}`}
                                name={questions[questionNumber].text}
                                value={index}
                                onChange={(e) => answerQuestion(questionNumber, e.target.value)}
                              />
                              <label
                                htmlFor={`${questions[questionNumber].text}-${index}`}
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
              {/* {JSON.stringify(surveyResults)} */}
              <ul>
                {questions.map((question, index) => {
                  return (
                    <li key={index} className="flex flex-row items-center py-2">
                      <span className="text-xl font-semibold">{question.text}{' => '}{question.options[surveyResults[index].answerId].text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <button
              type="button"
              className="btn btn-blue"
              onClick={() => handleSubmitSurvey()}
            >
              Submit your answers
            </button>
          </div>
        )}

      </div>
    </>
  );
}
 
export default Survey;