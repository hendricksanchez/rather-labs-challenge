import { useState, useEffect } from "react";
import Web3 from "web3";
const contractAbi = require("../../contract-abi.json");

const useWallet = () => {
  //wallet
  const [isWalletInstalled, setIsWalletInstalled] = useState(true);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isTheRightNetwork, setIsTheRightNetwork] = useState(false);
  //token
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  
  //survey
  const [showSurvey, setShowSurvey] = useState(false);


  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.enable();
      console.log("accounts", accounts);
      setIsWalletConnected(true);
    }
    catch (err) {
      console.error("error", err);
    }
  }

  const connectToBlockchain = async () => {
    const accounts = await ethereum.enable();
    // console.log("accounts", accounts);

    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
    // console.log("contract", contract);

    //this 'id' returned must match with the Net Ropsten ID (compare to .env file CHAIN_ID)
    const id = await web3.eth.net.getId();
    // console.log("id", id);
    if (process.env.CHAIN_ID == id)
      setIsTheRightNetwork(true);

    const addresses = await web3.eth.getAccounts();
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
    if (!window.ethereum) {
      setIsWalletInstalled(false);
    }
  }, []);





  return {
    isWalletInstalled,
    isWalletConnected,
    showSurvey,
    setShowSurvey,
    tokenBalance,
    tokenName,
    tokenSymbol,
    isTheRightNetwork,
    connectWallet
  };
}
 
export default useWallet;