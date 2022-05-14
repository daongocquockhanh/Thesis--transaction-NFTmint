import '../styles/globals.css'
import { TwitterProvider } from '../context/TwitterContext'
import '../lib/hexStyles.css'

function MyApp({ Component, pageProps }) {
  return (
    
      <Component {...pageProps} />
    
  )
}

export default MyApp