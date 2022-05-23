import { useState, createContext, useContext } from "react";

export const AppContext = createContext({
  walletAddress: {},
  setWalletAddress: () => {}
});

export const AppWrapper = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  return <AppContext.Provider
    value={{ walletAddress, setWalletAddress }}>
      {children}
    </AppContext.Provider>
}

const useAppContext = () => {
  return useContext(AppContext);
}

export default useAppContext;