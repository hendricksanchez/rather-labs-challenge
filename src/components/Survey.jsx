import { useState, useEffect } from "react";

const Survey = ({ questions, handleSubmitSurvey }) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(null);
  const [showOverview, setShowOverview] = useState(false);

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  const waitFor = (seconds) => new Promise(r => setTimeout(r, seconds * 1000));

  const handlerQuestions = async () => {
    setShowQuestions(true);
    await asyncForEach(questions, async (question, number) => {
      // console.log("question NUMBER", number);
      setQuestionNumber(number);
      // console.log("END of question number", number);
      // console.log("waitFor");
      await waitFor(question.lifetimeSeconds);
    })
    setShowQuestions(false);
    setShowOverview(true);
    // console.log("Overview shown!");
  };

  // const handleSendAnswer = (e) => {
  //   e.preventDefault();
  //   console.log("handleSendAnswer", e.target.value);
  // }
  
  useEffect(() => {
    // handlerQuestions();
    setShowOverview(true);
  }, []);

  if (!questions) return '';
  
  return (
    <>

      {showQuestions && questionNumber != null && (
        <form>
        <div className="shadow-lg lg:max-w-full lg:flex">
          <div className="h-48 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l" style={{ backgroundImage: `url(${questions[questionNumber].image})`}} title="Woman holding a mug"></div>
          <div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="p-4">
              <div>
                <p className="text-gray-900 text-center font-bold text-3xl">{questions[questionNumber].text}</p>
                {/* <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p> */}
              </div>
              <div className="flex flex-col">
                <div className="py-8 px-6">
                  {questions[questionNumber].options.map((option, index) => {
                    return (
                      <>
                        <div key={index} className="flex flex-row py-2">
                          <input
                            className="w-4 h-4 border-gray-300 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                            id={`${questions[questionNumber].text}-${index}`}
                            type="radio"
                            name={questions[questionNumber].text}
                            value={index}
                          />
                          <label
                            htmlFor={`${questions[questionNumber].text}-${index}`}
                            className="block ml-2 text-xl text-gray-900 dark:text-gray-500"
                          >
                            {option.text}
                          </label>
                        </div>
                      </>
                    )
                  })}
                </div>
                {/* <div className="flex justify-center">
                  <button type="submit" onClick={(e) => handleSendAnswer(e)} className="btn btn-blue">Send</button>
                </div> */}
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1.5 dark:bg-gray-700">
              <div className={`bg-blue-600 h-1.5 w-11/12`}></div>
            </div>
          </div>
        </div>
        </form>
      )}

      {showOverview && (
        <div className="flex flex-col justify-center items-center">
          {/* <div> */}
            <p className="text-5xl font-bold pt-8 pb-12">
              The survey is over!
            </p>
          {/* </div>
          <div> */}
            <button
              type="button"
              className="btn btn-blue"
              onClick={handleSubmitSurvey}
            >
              Submit your anwers
            </button>
          {/* </div> */}
        </div>
      )}
      
    </>
  );
}
 
export default Survey;