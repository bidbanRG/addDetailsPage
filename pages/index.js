import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components';
import { useContext,useEffect,useState } from 'react';
import Web3 from 'web3'



export default function Home() {
   const [account, setaccount] = useState('No User')
   const [web3,setWeb3] = useState(null);
   const [contract,setContract] = useState(null);
 const Connect =  async ()=>{
	 if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setaccount(accounts[0]);
	   web3 = new Web3(window.ethereum);
		setWeb3(web3);      
  }
}
 useEffect(()=>{
    if(web3){
      var address = "0x7Aecd3D5C3199Aa489205601B459B260Fa2D2df7";
      const contract = new web3.eth.Contract([
         {
            "inputs": [],
            "name": "N",
            "outputs": [
               {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
               }
            ],
            "stateMutability": "view",
            "type": "function"
         },
         {
            "inputs": [
               {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
               }
            ],
            "name": "Properties",
            "outputs": [
               {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
               },
               {
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
               },
               {
                  "internalType": "bool",
                  "name": "sold",
                  "type": "bool"
               }
            ],
            "stateMutability": "view",
            "type": "function"
         },
         {
            "inputs": [
               {
                  "internalType": "uint256",
                  "name": "idx",
                  "type": "uint256"
               }
            ],
            "name": "buy",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
         },
         {
            "inputs": [
               {
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
               }
            ],
            "name": "setProperty",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
         }
      ],address);
      setContract(contract);
     
   }         
       
     
 },[account,web3])
 const get = async () => {
    if(contract){
    console.log(contract);
  const deley = await contract.methods.Properties(3).call();
   console.log(deley);
}
   }
     
   const set = async () => {
      if(contract){
      const tx = await contract.methods.setProperty(4000).send({from:account});
        console.log('done');
      console.log(tx)}
   }  
  const buy = async (idx) => {
     if(!idx) return alert('no Property choosen');
     if(contract){
      const fundit = await contract.methods.buy(idx).send({
         from: account, 
         value: 40000000000 
        })
         console.log(fundit);
      }
     
  } 
//0.000000000000004001

//  async function fun(){
//     const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
//      setaccount(accounts[0]);
//   console.log(account);
//    } 
const [idx,setidx] = useState(null);
 return (
    <App>
      <Box>
        
        <Input type = 'text' placeholder = '0xb....' autoFocus/>
        <Button onClick = {()=>Connect()}> submit </Button>
          <Button> 
              {account}
           </Button>
           <Button onClick = {()=>get()}>get</Button>
           <Button onClick = {()=>set()}>set</Button>
           <input type = 'text' onChange = {(e)=>setidx(e.target.value)}/>
           <Button onClick = {()=>buy(idx)}buy>buy</Button>          
        </Box>
    </App>
  )
}

const Box = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`
const MetaConnect = styled.button`
   height:30px;
   
   background-color: skyblue;
   margin-top: 20px;
   border-radius: 20px;
   font-weight: 700;
   font-size: 100%;
`
const App = styled.div`
  height:100vh;
  width:100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #171717;
`
const Button = styled.button`
   
    height: 30px;
    border-radius: 20px;
    margin-top: 20px;
    border: 3px solid black;
    background-color: skyblue;
    font-size: 100%;
    font-weight: 700;
    margin-left: 5px;
`
const Input = styled.input`
   height:25px;
   background-color:aliceblue;
   border-radius: 5px;
`