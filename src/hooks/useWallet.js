import { useState, useEffect } from "react";
import Web3 from "web3";
import networks from '../../networks';
const contractAbi = require("../../contract-abi.json");

const useWallet = () => {
  //web3
  const [web3Provider, setWeb3Provider] = useState(null);
  //wallet
  const [isWalletInstalled, setIsWalletInstalled] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isTheCorrectNetwork, setIsTheCorrectNetwork] = useState(null);
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState(null);
  //token
  const [tokenBalance, setTokenBalance] = useState(null);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  
  const getWindowEthereum = () => {
    return window.ethereum;
  }

  const connectWallet = async () => {
    try {
      const ethereum = getWindowEthereum();
      await ethereum.enable();
      setIsWalletConnected(true);
      await checkItIsCorrectNetwork();
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
      if (networkId == process.env.CHAIN_ID)
        setIsTheCorrectNetwork(true);
      else
        setIsTheCorrectNetwork(false);  
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
    // console.log("a veeeer el smartContract", smartContract);
    if (smartContract == null) {
      const provider = getWeb3Provider();
      // console.log("contract does not exists!, creating it...");
      const contract = new provider.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
      setSmartContract(contract);
      // console.log("contract created", contract);
      return contract;
    }
    // console.log("the contract EXISTS! -", smartContract);
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

  const getAccounts = async () => {
    try {
      const provider = getWeb3Provider();
      const accounts = await provider.eth.getAccounts();
      // console.log("accounts", accounts);
      //only set the first account
      setAccount(accounts[0]);
    }
    catch (err) {
      console.error("Cannot get accounts from Wallet -", err);
      setAccount(null);
    }
  }

  const getBasicsFromContract = async () => {
    try {
      // await getContract();
      // console.log("cero");
      setTimeout(async () => {
        // console.log("empezando...");
        await getTokenName();
        // console.log("uno");
        await getTokenSymbol();
        // console.log("dos");
        await getTokenBalance();
        // console.log("tres");
      }, 1000)
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
      // console.log("account", account);
      const balance = await contract.methods.balanceOf(account).call();
      setTokenBalance(provider.utils.fromWei(balance));
    }
    catch (err) {
      console.error("Error retrieving the Token Balance -", err);
    }
  }

  useEffect(() => {
    checkIfWalletIsInstalled();
  }, []);

  useEffect(() => {
    if (isWalletConnected) getAccounts();
  }, [isWalletConnected])

  useEffect(() => {
    if (isTheCorrectNetwork) getBasicsFromContract();
  }, [isTheCorrectNetwork])

  return {
    isWalletInstalled,
    isWalletConnected,
    tokenBalance,
    tokenName,
    tokenSymbol,
    account,
    isTheCorrectNetwork,
    connectWallet,
    handleNetworkSwitch,
    getContract,
    checkIfWalletIsInstalled,
    getWindowEthereum
  };
}
 
export default useWallet;