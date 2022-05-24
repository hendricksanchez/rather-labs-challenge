import { useEffect } from "react";
import useSurvey from "../hooks/useSurvey";
// import Option from "./Option";

const SurveyQuestions = ({ questions }) => {

  const {
    questionNumber,
    timeleftProgressBar,
    answerQuestion,
    handlerQuestions
  } = useSurvey();

  useEffect(() => {
    console.log("questions", questions);
    handlerQuestions();
  }, []);

  return (
    <>
      {questionNumber !== null && (
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
                          // <Option
                          //   key={index}
                          //   title={option.text}
                          //   id={`${questions[questionNumber].text}-${index}`}
                          //   name={questions[questionNumber].text}
                          //   value={index}
                          //   handlerOnChange={answerQuestion}
                          //   htmlFor={`${questions[questionNumber].text}-${index}`}
                          //   questionNumber={questionNumber}
                          // />

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
    </>
  );
}
 
export default SurveyQuestions;