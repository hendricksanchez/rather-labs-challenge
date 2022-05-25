import { useEffect } from "react";
import MainContainer from "../components/MainContainer";
import useSurvey from "../hooks/useSurvey";

const Index = ({ surveyData }) => {
  const { setSurveyData } = useSurvey();
  useEffect(() => {
    if (surveyData != null) {
      setSurveyData(surveyData);
    }
  }, []);
  return (
    <MainContainer />
  );
};

export default Index;

export async function getServerSideProps() {
  const surveyData = await fetch(process.env.SURVEY_URL)
    .then(res => {
      return res.json()
    })
    .catch(res => {
      console.error(`Error fetching Survey URL | ${res}`);
      return null;
    })
  
  return {
    props: {
      surveyData
    },
  };
}