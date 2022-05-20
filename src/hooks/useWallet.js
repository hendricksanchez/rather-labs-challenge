import { useState, useEffect } from "react";
import Web3 from "web3";
import networks from '../../networks';
const contractAbi = require("../../contract-abi.json");

const useWallet = () => {
  //wallet
  const [isWalletInstalled, setIsWalletInstalled] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isTheCorrectNetwork, setIsTheCorrectNetwork] = useState(null);
  const [account, setAccount] = useState(null);
  //token
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  
  //survey
  const [showSurvey, setShowSurvey] = useState(false);

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
    const provider = getWeb3Provider();
    const networkId = await provider.eth.net.getId();
    if (networkId == process.env.CHAIN_ID)
      setIsTheCorrectNetwork(true);
    else
      setIsTheCorrectNetwork(false);
  }

  const getWeb3Provider = () => {
    return new Web3(Web3.givenProvider);
  }

  const getContract = () => {
    const provider = getWeb3Provider();
    return new provider.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
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
      //only set the first account
      setAccount(accounts[0]);
      // console.log("accounts", accounts);
    }
    catch (err) {
      console.error("Cannot get accounts from Wallet -", err);
      setAccount(null);
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
    const contract = getContract();
    const name = await contract.methods.name().call();
    console.log("tokenName", name);
    setTokenName(name);
  }

  const getTokenSymbol = async () => {
    const contract = getContract();
    const symbol = await contract.methods.symbol().call();
    console.log("tokenSymbol", symbol);
    setTokenSymbol(symbol);
  }

  const getTokenBalance = async () => {
    const provider = getWeb3Provider();
    const contract = getContract();
    const balance = await contract.methods.balanceOf(account).call();
    console.log("balanceOf", provider.utils.fromWei(balance));
    setTokenBalance(provider.utils.fromWei(balance));
  }

  const connectToBlockchain = async () => {
    // const accounts = await ethereum.enable();
    // console.log("accounts", accounts);

    // const web3 = new Web3(Web3.givenProvider);
    // const contract = new web3.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
    // console.log("contract", contract);

    //this 'id' returned must match with the Net Ropsten ID (compare to .env file CHAIN_ID)
    // const id = await web3.eth.net.getId();
    // console.log("id", id);
    // if (process.env.CHAIN_ID == id)
    //   setIsTheCorrectNetwork(true);

    // const addresses = await web3.eth.getAccounts();
    // console.log("addresses", addresses);

    const name = await contract.methods.name().call();
    console.log("tokenName", name);
    setTokenName(name);

    const symbol = await contract.methods.symbol().call();
    console.log("tokenSymbol", `$${symbol}`);
    setTokenSymbol(symbol);

    const balance = await contract.methods.balanceOf(addresses[0]).call();
    console.log("balanceOf", web3.utils.fromWei(balance));
    setTokenBalance(web3.utils.fromWei(balance));
  }

  const handleSubmitSurvey = async () => {
    console.log("handleSubmitSurvey hereeeee!");
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
    const addresses = await web3.eth.getAccounts();

    const parameters = {
      from: addresses[0],
      to: process.env.CONTRACT_ADDRESS,
      data: contract.methods.submit(16624220, [5, 3, 7]).encodeABI(),
    };

    try {
      const trxHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [parameters]
      })
      console.log("trxHash", trxHash);
    }
    catch (e) {
      console.error("Horror!", e);
    }
  }
  
  useEffect(() => {
    checkIfWalletIsInstalled();
  }, []);

  useEffect(() => {
    if (isWalletConnected) {
      getAccounts();
      if (isTheCorrectNetwork) {
        getBasicsFromContract();
      }
    }
  }, [isWalletConnected, isTheCorrectNetwork])

  return {
    isWalletInstalled,
    isWalletConnected,
    showSurvey,
    setShowSurvey,
    tokenBalance,
    tokenName,
    tokenSymbol,
    account,
    isTheCorrectNetwork,
    connectWallet,
    handleNetworkSwitch
  };
}
 
export default useWallet;