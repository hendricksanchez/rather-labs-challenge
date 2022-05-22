import { useState, useEffect } from 'react';
import useWallet from './useWallet';

const useSurvey = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  const {
    account,
    checkIfWalletIsInstalled,
    getContract,
    getWindowEthereum
  } = useWallet();

  const submitSurvey = async () => {
    console.log("uno");
    const contract = await getContract();
    
    const parameters = {
      from: account,
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

  useEffect(() => {
    checkIfWalletIsInstalled();
  }, [])

  return {
    showSurvey,
    setShowSurvey,
    submitSurvey,
  };
}
 
export default useSurvey;
