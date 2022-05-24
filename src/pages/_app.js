import { SurveyWrapper } from '../contexts/surveyContext'
import { WalletWrapper } from '../contexts/walletContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SurveyWrapper>
      <WalletWrapper>
        <Component {...pageProps} />
      </WalletWrapper>
    </SurveyWrapper>
  )
}

export default MyApp
