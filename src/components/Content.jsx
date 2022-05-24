import Image from 'next/image';
import Alert from './Alert';
import Button from './Button';
import Message from './Message';
import Survey from './Survey';
import useSurvey from '../hooks/useSurvey';
import useWallet from '../hooks/useWallet';
import { alerts } from '../utils/const';

const Content = () => {

  const {
    isWalletInstalled,
    isWalletConnected,
    isTheCorrectNetwork,
    connectWallet,
    checkItIsCorrectNetwork,
    handleNetworkSwitch
    // submitContract
  } = useWallet();

  const {
    surveyData,
    showSurvey,
    setShowSurvey
  } = useSurvey();

  return (
    <div className="flex flex-col items-center justify-center py-6">

        {!surveyData && (
          <Alert
            type={alerts.WARNING}
            title='There was an error retrieving the survey data! '
            subtitle='Please, reload the application.' />
        )}

        {surveyData && (
          <>

            {!isWalletInstalled && (
              <Alert
                type={alerts.WARNING}
                title='Metamask Wallet is not installed! '
              >
                Please install it <a href="https://metamask.io/" target='_blank' rel='noreferrer' className="font-semibold ">here</a>
              </Alert>
            )}
            
            {isWalletInstalled && !isWalletConnected && (
              <>
                <Message>
                  <span className="text-3xl font-semibold">To get started, you need to connect to your wallet.</span>
                </Message>
                <Button
                  type='button'
                  title='Connect to Metamask'
                  onClick={() => connectWallet(checkItIsCorrectNetwork)} />
              </>
            )}

            {isWalletConnected && (
              <>

                {isTheCorrectNetwork && (
                  <>

                    {!showSurvey && (
                      <>
                        <Message>
                          <Image src={surveyData.image} width={85} height={85} />
                          <span className="text-5xl">{surveyData.title}</span>
                        </Message>
                        <Button
                          type='button'
                          title='Start Survey'
                          onClick={() => setShowSurvey(!showSurvey)} />
                      </>
                    )}

                    {showSurvey && (
                      <>
                        <Message>
                          <Image src={surveyData.image} width={65} height={65} />
                          <span className="text-3xl my-4">{surveyData.title}</span>
                        </Message>
                        <Survey />
                      </>
                    )}

                  </>
                )}

                {!isTheCorrectNetwork && (
                  <>
                    <Alert
                      type={alerts.WARNING}
                      title='You are currently connected to the wrong network! '
                      subtitle='Please, connect to Ropsten by clicking the button below' />
                    <Button
                      type='button'
                      title='Switch to Ropsten'
                      onClick={() => handleNetworkSwitch("ropsten")} />
                  </>
                )}

              </>
            )}
          </>
        )}

    </div>
  );
}
 
export default Content;