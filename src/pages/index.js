import Image from 'next/image';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Survey from '../components/Survey';
const contractAbi = require("../../contract-abi.json");

const Index = ({ surveyData }) => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);
  const [isTheCorrectNet, setIsTheCorrectNet] = useState(false);
  const [isSurveyDataAvailable, setIsSurveyDataAvailable] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);

  const connectToBlockchain = async () => {
    const accounts = await window.ethereum.enable();
    // console.log("accounts", accounts);

    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
    // console.log("contract", contract);

    //this 'id' returned must match with the Net Ropsten ID (compare to .env file CHAIN_ID)
    const id = await web3.eth.net.getId();
    // console.log("id", id);
    if (process.env.CHAIN_ID == id)
      setIsTheCorrectNet(true);

    const addresses = await web3.eth.getAccounts();
    // console.log("addresses", addresses);

    const name = await contract.methods.name().call();
    // console.log("tokenName", name);
    setTokenName(tokenName);

    const symbol = await contract.methods.symbol().call();
    console.log("tokenSymbol", symbol);
    setTokenName(symbol);

    const balance = await contract.methods.balanceOf(addresses[0]).call();
    console.log("balanceOf", balance);
    setTokenBalance(balance);
  }

  // const getContract = () => {
  //   const web3 = new Web3(Web3.givenProvider);
  //   const provider = 
  // }

  const handleSubmitSurvey = async () => {
    console.log("handleSubmitSurvey hereeeee!");
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
    const addresses = await web3.eth.getAccounts();

    // const parameters = {
    //   to: process.env.CONTRACT_ADDRESS,
    //   from: addresses[0],
    //   data: contract.methods.submit()
    // };

    // const gas = await contract.methods.submit('sd1sd1s1df5df21df', '0').estimateGas();
    // console.log("gas", gas.toString());
    
    // const balanceFrom = await web3.utils.fromWei(
    //   await web3.eth.getBalance(addresses[0]),
    //   'ether'
    // );
    // console.log("balanceFrom", balanceFrom);

  }
  
  useEffect(() => {
    // const { ethereum } = window;
    if (!window.ethereum) {
      setIsMetamaskInstalled(false);
    }
    else {
      connectToBlockchain();
    }
    // console.log("surveyData", surveyData);
    if (surveyData) {
      setIsSurveyDataAvailable(true);
    }
  }, []);

  // useEffect(() => {
  //   console.log("showSurvey", showSurvey);
  // }, [showSurvey]);

  return (
    <div className="container flex flex-wrap max-w-full h-screen sm:p-5 lg:p-16">
      <div className="bg-slate-50 rounded-xl shadow-md overflow-hidden w-full sm:p-2 lg:p-5">
        
        <div className="flex flex-col">

          <div>
            {/* Logo and Survey Title */}
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center justify-start">
                <div className="flex flex-row items-center p-1">
                  <Image src={'/logo.png'} width={45} height={45} alt={"Qwerty Company Logo"} />
                </div>
                <div>
                  <span className='text-2xl my-4'>
                    Qwerty Company
                  </span>
                </div>
              </div>
              <div className='justify-end'>
                <span className='text-3xl my-4'>
                  {/* Participate at our Quiz and get earn some tokens! */}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start py-6">
            {/* {isMetamaskInstalled && (
              <div className="flex flex-col items-center justify-center ">
                <p className="text-3xl my-4">First, let`s to connect to the wallet</p>
                <button type="button" className="btn btn-blue">Connect Wallet</button>
              </div>
            )} */}

            {!isMetamaskInstalled && (
              <div id="alert-4" className="flex p-4 mb-4 bg-orange-100 rounded-lg dark:bg-orange-200" role="alert">
                <svg className="flex-shrink-0 w-5 h-5 text-orange-700 dark:text-orange-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                <div className="ml-3 text-sm font-medium text-orange-700 dark:text-orange-800">
                  Metamask Wallet is not installed, please install it <a href="https://metamask.io/" target='_blank' rel='noreferrer' className="font-semibold underline hover:text-orange-800 dark:hover:text-orange-900">here</a>
                </div>
              </div>
            )}

            {!showSurvey && (
              <div className="flex flex-col w-1/2 items-center justify-center">
                <div className='flex flex-row my-5'>
                  <Image src={surveyData.image} width={85} height={85} />
                  <span className="text-5xl my-4">{surveyData.title}</span>
                </div>
                <button onClick={() => setShowSurvey(!showSurvey)} type="button" className="btn btn-blue">Start survey</button>
              </div>
            )}

            {showSurvey && (
              <div className="flex flex-col w-1/2 items-center justify-center">
                <div className='flex flex-row my-5'>
                  <Image src={surveyData.image} width={65} height={65} />
                  <span className="text-3xl my-4">{surveyData.title}</span>
                </div>
                <div className="flex flex-wrap w-full flex-col py-5">
                  <Survey
                    questions={surveyData.questions}
                    handleSubmitSurvey={handleSubmitSurvey}
                  />
                </div>
              </div>
            )}

          </div>
          
        </div>
        
      </div>

    </div>
  );
};
export default Index;

export async function getServerSideProps() {
  const surveyData = await fetch(process.env.SURVEY_URL)
    .then(res => {
      return res.json()
    })
    .catch(res => {
      console.error(`ERROR fetching ${process.env.SURVEY_URL} | ${res}`);
      return null;
    })
  return {
    props: {
      surveyData,
    },
  };
}