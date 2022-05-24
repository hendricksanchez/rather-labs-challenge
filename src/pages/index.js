import Image from 'next/image';
import Survey from '../components/Survey';
import useSurvey from '../hooks/useSurvey';
import useWallet from '../hooks/useWallet';

const Index = ({ surveyData }) => {

  const {
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
    submitContract
  } = useWallet();

  const {
    showSurvey,
    setShowSurvey
  } = useSurvey();

  return (
    <div className="container flex flex-wrap max-w-full h-screen sm:p-5 lg:p-16">
      <div className="bg-slate-50 rounded-xl shadow-md overflow-hidden w-full sm:p-2 lg:p-5">
        
        <div className="flex flex-col">

          <div className="w-full">
            <div className="flex flex-row justify-between">
              <div>
                <span className='text-4xl font-semibold'>
                  Survey
                </span>
              </div>
              
              {isWalletConnected && walletAddress && (
                <div>
                  <div className="p-3 bg-blue-200 items-center text-blue-600 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    {tokenName && tokenSymbol && tokenBalance && (
                      <span className="flex rounded-full bg-blue-500 px-2 py-1 text-sm font-bold text-white mr-3">{`${tokenName} ($${tokenSymbol}) Balance: ${tokenBalance}`}</span>
                    )}
                    <span className="font-semibold text-left flex-auto">{`Account ${walletAddress.substring(0, 5)}...${walletAddress.substring(walletAddress.length-4)}`}</span>
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="flex flex-col items-center justify-start py-6">

            {!surveyData && (
              <div>
                There was an error retrieving external data. Please reload the application!
              </div>
            )}

            {surveyData && (
              <>
                {!isWalletInstalled && (
                  <div id="alert-4" className="flex p-4 mb-4 bg-orange-100 rounded-lg dark:bg-orange-200" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5 text-orange-700 dark:text-orange-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <div className="ml-3 text-sm font-medium text-orange-700 dark:text-orange-800">
                      Metamask Wallet is not installed, please install it <a href="https://metamask.io/" target='_blank' rel='noreferrer' className="font-semibold underline hover:text-orange-800 dark:hover:text-orange-900">here</a>
                    </div>
                  </div>
                )}
                {!isWalletConnected && (
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-3xl font-semibold pt-8 pb-12">
                      To get started, you need to connect to your wallet.
                    </p>
                    <button
                      type="button"
                      className="btn btn-blue"
                      onClick={() => connectWallet(checkItIsCorrectNetwork)}
                    >
                      Connect to Metamask
                    </button>
                  </div>
                )}
                {isWalletConnected && (
                  <>
                    {isTheCorrectNetwork && (
                      <>
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
                                handleSubmitSurvey={() => submitContract()}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {!isTheCorrectNetwork && (
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-center text-3xl font-semibold pt-8 pb-12">
                          You are currently connected to the wrong network,
                          <br/>
                          please connect to Ropsten by clicking the button below
                        </p>
                        <button
                          type="button"
                          className="btn btn-blue"
                          onClick={() => handleNetworkSwitch("ropsten")}
                        >
                          Switch to Ropsten
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
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
      console.error(`Error fetching Survey URL | ${res}`);
      return null;
    })
  
  return {
    props: {
      surveyData
    },
  };
}