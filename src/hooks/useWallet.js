import { useState, useEffect } from "react";
import Web3 from "web3";
import networks from '../../networks';
// import useAppContext from "../contexts/appContext";
const contractAbi = require("../../contract-abi.json");

const useWallet = () => {
  //states from AppContext
  // const { walletAddress, setWalletAddress } = useAppContext();
  const [walletAddress, setWalletAddress] = useState(null);
  //web3
  const [web3Provider, setWeb3Provider] = useState(null);
  //wallet
  const [isWalletInstalled, setIsWalletInstalled] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(null);
  const [isTheCorrectNetwork, setIsTheCorrectNetwork] = useState(null);
  const [smartContract, setSmartContract] = useState(null);
  //token
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  
  const getWindowEthereum = () => {
    return window.ethereum;
  }

  const connectWallet = async (callback) => {
    try {
      const ethereum = getWindowEthereum();
      const addresses = await ethereum.request({ method: 'eth_requestAccounts' });
      setIsWalletConnected(true);
      setWalletAddress(addresses[0]);
      if (typeof callback == 'function')
        await callback();
    }
    catch (err) {
      console.error("Cannot connect to the Wallet -", err);
      setIsWalletConnected(false);
    }
  }

  const checkItIsCorrectNetwork = async () => {
    try {
      const provider = getWeb3Provider();
      const networkId = await provider.eth.net.getId();
      if (networkId == process.env.CHAIN_ID) {
        setIsTheCorrectNetwork(true);
      }
      else {
        setTokenName(null);
        setTokenSymbol(null);
        setTokenBalance(null);
        setIsTheCorrectNetwork(false);
      }
    }
    catch (err) {
      console.error("Cannot check if is the correct network -", err);
    }
    
  }

  const getWeb3Provider = () => {
    if (web3Provider) {
      return web3Provider;
    }
    else {
      const provider = new Web3(Web3.givenProvider) ;
      setWeb3Provider(provider);
      return provider;
    }
  }

  const getContract = () => {
    if (smartContract == null) {
      const provider = getWeb3Provider();
      const contract = new provider.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
      setSmartContract(contract);
      return contract;
    }
    return smartContract;
  }

  const checkIfWalletIsInstalled = () => {
    if (getWindowEthereum()) {
      setIsWalletInstalled(true);
      return true;
    }
    else {
      setIsWalletInstalled(false);
      return false;
    }
  }

  const handleNetworkSwitch = async (networkName) => {
    try {
      const ethereum = getWindowEthereum();
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${Number(networks[networkName].chainId).toString(16)}`
          }
        ],
      });
      setIsTheCorrectNetwork(true);
    }
    catch (err) {
      console.error("Wrong network -", err.message);
      setIsTheCorrectNetwork(false);
    }
  }

  const getBasicsFromContract = async () => {
    try {
      await getTokenName();
      await getTokenSymbol();
      await getTokenBalance();
    }
    catch (err) {
      console.error("Cannot get basics from contract", err);
    }
  }

  const getTokenName = async () => {
    try {
      const contract = await getContract();
      const name = await contract.methods.name().call();
      setTokenName(name);
    }
    catch (err) {
      console.error("Error retrieving the Token Name -", err);
    }
  }

  const getTokenSymbol = async () => {
    try {
      const contract = await getContract();
      const symbol = await contract.methods.symbol().call();
      setTokenSymbol(symbol);
    }
    catch (err) {
      console.error("Error retrieving the Token Symbol -", err);
    }
  }

  const getTokenBalance = async () => {
    try {
      const provider = getWeb3Provider();
      const contract = await getContract();
      const balance = await contract.methods.balanceOf(walletAddress).call();
      setTokenBalance(provider.utils.fromWei(balance));
    }
    catch (err) {
      console.error("Error retrieving the Token Balance -", err);
    }
  }

  const submitContract = async () => {
    console.log("uno");
    const contract = await getContract();
    
    const parameters = {
      from: walletAddress,
      to: process.env.CONTRACT_ADDRESS,
      data: contract.methods.submit(16624220, [5, 3, 7]).encodeABI(),
    };

    console.log("parameters", parameters);

    try {
      const ethereum = getWindowEthereum();
      console.log("Submitting the survey...");
      const trxHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [parameters]
      })
      console.log("Survey submitted", trxHash);
    }
    catch (e) {
      console.error("Error submitting the survey -", e);
    }
  }

  const onChainChanged = () => {
    checkItIsCorrectNetwork();
  }

  const onAccountsChanged = () => {
    window.location.reload();
  }

  const addWalletListener = () => {
    const ethereum = getWindowEthereum();
    ethereum.on("chainChanged", onChainChanged)
    // ethereum.on("accountsChanged", onAccountsChanged);
  }

  useEffect(() => {
    checkIfWalletIsInstalled();
    addWalletListener();
  }, []);

  useEffect(() => {
    if (isTheCorrectNetwork) getBasicsFromContract();
  }, [isTheCorrectNetwork])

  return {
    isWalletInstalled,
    isWalletConnected,
    tokenBalance,
    tokenName,
    tokenSymbol,
    walletAddress,
    isTheCorrectNetwork,
    connectWallet,
    checkItIsCorrectNetwork,
    handleNetworkSwitch,
    getContract,
    checkIfWalletIsInstalled,
    getWindowEthereum,
    submitContract
  };
}
 
export default useWallet;