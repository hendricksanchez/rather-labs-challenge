import Button from "./Button";
import Alert from './Alert';
import { alerts } from '../utils/const';
import useSurvey from '../hooks/useSurvey';

const SurveyResults = ({ surveyResults, surveyData }) => {
  const {
    wasSurveySubmitted,
    submitSurvey,
    handlerReloadLocation,
  } = useSurvey();
  return (
    <div className="flex flex-col items-center mb-10">
      {surveyResults.length === surveyData.questions.length
        ? (
            <>
              <ul className="mb-3">
                {surveyData.questions.map((question, index) => {
                  return (
                    <li key={index} className="flex flex-row items-center py-1">
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
              {wasSurveySubmitted && (
                <Alert
                  type={alerts.WARNING}
                  title='The survey was sent successfully! '
                  subtitle='Token accreditation may take several minutes, please be patient'
                />
              )}
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
  );
}
 
export default SurveyResults;