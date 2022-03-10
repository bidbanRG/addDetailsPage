import React , {useState,useEffect} from 'react';

export const TransactionContext = React.createContext();
let eth;

if(typeof window !== 'undefined'){
    eth = window.ethereum
}
const TransactionProvider = ({children})=>{
     const [currentAccount, setcurrentAccount] = useState("NoUser");

    //  useEffect(()=>{
    //      walletConnected();
    //  },[])
     const  connectWallet = async (metamask = eth)=>{
        try{
         if(!metamask) return alert('Please Install MetaMask for your browser')
          const accounts = await metamask.request({method:'eth_requestAccounts'});
          setcurrentAccount(accounts[0]);
        }catch(error){
            console.log(error);
        }
     
    }
//   const walletConnected = async (metamask = eth)=>{
//     if(!metamask) return alert('Please Install MetaMask for your browser');
//     const accounts = await metamask.request({method:'eth_requestAccounts'});
//     if(accounts.length){
//         setcurrentAccount(accounts[0]);
       
//     }  
//}
   return (
       <TransactionContext.Provider
           value = {{
              currentAccount,
              setcurrentAccount,
              connectWallet, 
           }}
        >
           {children}    
       </TransactionContext.Provider>
   )
     

}
export default TransactionProvider;
