import '../styles/globals.css'
 import TransactionProvider from '../Context/TransactionContext'

import reportWebVitals from '../reportWebVitals';
function MyApp({ Component, pageProps }) {
return(
  //<MoralisProvider appId = 'enYa6w9ycWVe1TOwUpbiENuwxZZmrLrLdfTql5hD' serverUrl = 'https://a9ijlca1hksw.usemoralis.com:2053/server'>
  //<TransactionProvider>
     <Component {...pageProps} />
  //</TransactionProvider>
 // </MoralisProvider> 
 ) 
}
reportWebVitals();
export default MyApp
