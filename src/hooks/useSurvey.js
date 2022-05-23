import { useState } from 'react';

const useSurvey = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  return {
    showSurvey,
    setShowSurvey
  };
}
 
export default useSurvey;
