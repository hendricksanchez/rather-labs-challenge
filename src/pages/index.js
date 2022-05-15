import Image from 'next/image';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
const contractAbi = require("../../contract-abi.json");

const Index = () => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(true);

  // const checkTokenBalance = async (_contract) => {
    // const accounts = await window.ethereum.enable();
    // console.log("accounts", accounts);
    // const balance = await _contract.methods.cooldownSeconds().call();
    // console.log("balance", balance);
  // }

  const connectToBlockchain = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(contractAbi, process.env.CONTRACT_ADDRESS);
    console.log("contract", contract);

    const id = await web3.eth.net.getId();
    console.log("id", id);

    const addresses = await web3.eth.getAccounts();
    console.log("addresses", addresses);

    const tokenName = await contract.methods.name().call();
    console.log("tokenName", tokenName);

    const balanceOf = await contract.methods.balanceOf(addresses[0]).call();
    console.log("balanceOf", balanceOf);
  }
  
  useEffect(() => {
    // const { ethereum } = window;
    if (!window.ethereum) {
      setIsMetamaskInstalled(false);
    }
    else {
      connectToBlockchain();
    }
  }, []);

  return (
    <div className="container flex max-w-full sm:p-5 lg:p-16">
      <div className="bg-slate-50 rounded-xl shadow-md overflow-hidden w-full sm:p-2 lg:p-5">
        
        <div className="flex flex-col">

          <div>
            {/* Logo and Survey Title */}
            <div className="flex flex-row">
              <div className="flex">
                <div>
                  <Image src={'/logo.png'} width={45} height={45} alt={"Qwerty Company Logo"} />
                </div>
                <div>
                  Qwerty Company
                </div>
              </div>
              <div>
                <p className="text-right">
                  Participate at our Quiz and get earn some tokens!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-80">
            {/* {isMetamaskInstalled && (
              <div className="flex flex-col items-center justify-center ">
                <p className="text-3xl my-4">First, let`s to connect to the wallet</p>
                <button type="button" className="btn btn-blue">Connect Wallet</button>
              </div>
            )} */}
            {!isMetamaskInstalled && (
              <div className="flex items-center bg-orange-600 text-white text-sm font-bold px-4 py-3" role="alert">
                <svg className="fill-current h-6 w-6 text-white mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                <p>Metamask Wallet is not installed, please install it.</p>
              </div>
            )}
          </div>
          
        </div>
        
      </div>

    </div>
  );
};

export default Index;
