import useSurvey from "../hooks/useSurvey";

const SurveyQuestions = ({ questions }) => {
  const {
    questionNumber,
    timeleftProgressBar,
    answerQuestion
  } = useSurvey();
  return (
    <>
      {questionNumber !== null && (
        <form>
          {questions.map((question, questionIndex) => {
            return (
              <div key={questionIndex} className="shadow-lg lg:max-w-full lg:flex" style={{ display: questionIndex == questionNumber ? "flex" : "none" }}>
                <div className="lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l" style={{ backgroundImage: `url(${question.image})`, backgroundSize: 'cover'}}></div>
                <div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                  <div className="p-4">
                    <div>
                      <p className="text-gray-900 text-center font-bold text-3xl">{question.text}</p>
                    </div>
                    <div className="flex flex-col">
                      <div className="py-8 px-6">
                        <ul>
                          {question.options.map((option, answerIndex) => {
                            return (
                              <li key={answerIndex} className="flex flex-row items-center py-2">
                                <input
                                  className="w-4 h-4 border-gray-300 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                  type="radio"
                                  id={`${question.text}-${answerIndex}`}
                                  name={question.text}
                                  value={answerIndex}
                                  onChange={(e) => answerQuestion(questionIndex, e.target.value)}
                                />
                                <label
                                  htmlFor={`${question.text}-${answerIndex}`}
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
            )
          })}
        </form>
      )}
    </>
  );
}
 
export default SurveyQuestions;