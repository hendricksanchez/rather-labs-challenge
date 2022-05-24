import { createContext, useContext, useReducer } from "react";
import surveyReducer from "../reducers/surveyReducer";
import { initialState } from "../store/store";
// import { actions, initialState } from "../store/store";

export const AppContext = createContext({
  // walletAddress: {},
  // setWalletAddress: () => {}
});

export const AppWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(surveyReducer, initialState);
  
  // const [walletAddress, setWalletAddress] = useState(null);

  const values = {
    // walletAddress,
    // setWalletAddress,
    state,
    dispatch
    // surveyResults: state.surveyResults,
    // answerQuestion: (questionId, answerId) => {
    //   dispatch({ type: actions.ANSWER_QUESTION, payload: { questionId: questionId, answerId: answerId }});
    // }
  }

  return <AppContext.Provider
    value={values}>
      {children}
    </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext);
}

export default useAppContext;