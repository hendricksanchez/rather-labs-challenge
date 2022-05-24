import { createContext, useContext, useState } from "react";

export const WalletContext = createContext();

export const WalletWrapper = ({ children }) => {
  //web3
  const [web3Provider, setWeb3Provider] = useState(null);
  //wallet
  const [isWalletInstalled, setIsWalletInstalled] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isTheCorrectNetwork, setIsTheCorrectNetwork] = useState(null);
  const [smartContract, setSmartContract] = useState(null);
  //token
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);

  const values = {
    web3Provider,
    setWeb3Provider,
    isWalletInstalled,
    setIsWalletInstalled,
    isWalletConnected,
    setIsWalletConnected,
    walletAddress,
    setWalletAddress,
    isTheCorrectNetwork,
    setIsTheCorrectNetwork,
    smartContract,
    setSmartContract,
    tokenName,
    setTokenName,
    tokenSymbol,
    setTokenSymbol,
    tokenBalance,
    setTokenBalance
  }

  return <WalletContext.Provider
    value={values}>
      {children}
    </WalletContext.Provider>
}

const useWalletContext = () => {
  return useContext(WalletContext);
}

export default useWalletContext;