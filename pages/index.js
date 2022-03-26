import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components';
import { useContext,useEffect,useState } from 'react';
import Web3 from 'web3'



export default function Home() {
   const [account, setaccount] = useState(null)
   const [web3,setWeb3] = useState(null);
   const [contract,setContract] = useState(null);
   const [ans,setans] = useState({});
  const [Load,setLoad] = useState(false);

 const Connect =  async ()=>{
	 if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setaccount(accounts[0]);
	   web3 = new Web3(window.ethereum);
		setWeb3(web3)     
  }
} 
 useEffect(()=>{
    if(web3){
      var address = "0xb7a5172f20Bda4dC6482AA598c785Cdc3e6B147c";
      const contract = new web3.eth.Contract([
   {
      "inputs": [
         {
            "internalType": "address",
            "name": "buyer",
            "type": "address"
         },
         {
            "internalType": "int256",
            "name": "which",
            "type": "int256"
         }
      ],
      "name": "Addbuyer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "string",
            "name": "Name",
            "type": "string"
         },
         {
            "internalType": "string",
            "name": "Address",
            "type": "string"
         },
         {
            "internalType": "int256",
            "name": "Area",
            "type": "int256"
         },
         {
            "internalType": "int256",
            "name": "CostPerUnitArea",
            "type": "int256"
         }
      ],
      "name": "addDetails",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "string",
            "name": "name",
            "type": "string"
         }
      ],
      "name": "addName",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "address payable",
            "name": "recipent",
            "type": "address"
         },
         {
            "internalType": "int256",
            "name": "which",
            "type": "int256"
         },
         {
            "internalType": "string",
            "name": "name",
            "type": "string"
         },
         {
            "internalType": "string",
            "name": "Address",
            "type": "string"
         },
         {
            "internalType": "int256",
            "name": "Cpa",
            "type": "int256"
         },
         {
            "internalType": "int256",
            "name": "Ar",
            "type": "int256"
         }
      ],
      "name": "Buy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "address",
            "name": "",
            "type": "address"
         }
      ],
      "name": "ACCOUNTS",
      "outputs": [
         {
            "internalType": "string",
            "name": "",
            "type": "string"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "address",
            "name": "",
            "type": "address"
         },
         {
            "internalType": "int256",
            "name": "",
            "type": "int256"
         }
      ],
      "name": "Land",
      "outputs": [
         {
            "internalType": "string",
            "name": "Name",
            "type": "string"
         },
         {
            "internalType": "string",
            "name": "Address",
            "type": "string"
         },
         {
            "internalType": "int256",
            "name": "Area",
            "type": "int256"
         },
         {
            "internalType": "int256",
            "name": "CostPerUnitArea",
            "type": "int256"
         },
         {
            "internalType": "address",
            "name": "addBuyer",
            "type": "address"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   },
   {
      "inputs": [
         {
            "internalType": "address",
            "name": "",
            "type": "address"
         }
      ],
      "name": "plots",
      "outputs": [
         {
            "internalType": "int256",
            "name": "",
            "type": "int256"
         }
      ],
      "stateMutability": "view",
      "type": "function"
   }
],address);
      setContract(contract);
     
   }         
       
     
 },[account,web3])
 

 console.log(contract,account);

const detailshandler = async () => {
   if(!account) return alert('Connect your Wallet');
  const {Name,Address,Area,Cost} = ans;
  if(!Name || !Address || !Area || !Cost) return alert('Please enter all of the details');
   setLoad(true);
   try{
   await contract.methods.addDetails(Name,Address,Area,Cost).send({from:account});
   //await contract.methods.addName(Name).send({from:account});

  }
  catch(error){
     alert(error.message);
  }
  
   setLoad(false);
}
const registerhandler = async () => {
   const {Name} = ans;
   if(!Name) return alert('Enter your Name');
    setLoad(true);
   try{
      await contract.methods.addName(Name).send({from:account});
   }
   catch(error){
      alert(error.message);
   }
   setLoad(false);
}
 return (
    <App>
      { Load && <Loader> <SpinRoller/> </Loader>}  
      <Box>

      </Box>
      <Box1>
         <Header onClick = {Connect}> <h4>{!account ? 'Connect Wallet' : account} </h4> </Header>
<Input  onChange = {(e) => setans({Name:e.target.value})}  placeholder = ' Enter your Name' />
         <Input placeholder = ' Enter your Address' onChange = {(e) => setans({...ans,Address:e.target.value})}/>
         <Input placeholder = ' Land Area' onChange = {(e) => setans({...ans,Area:e.target.value})}/>
         <Input placeholder = ' Cost per unit square meter' onChange = {(e) => setans({...ans,Cost:e.target.value})}/>
          <Header onClick = {detailshandler}> <h2> Submit </h2> </Header> 
          <Header onClick = {registerhandler}> <h2> Register </h2> </Header>
          <h2> {`In Case you don't have a Land You can Register only with your Name`} </h2>
       </Box1>
    </App>
  )
}

function SpinRoller() {
  return (
    <div className = {styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}
const Box1 = styled.div`
  width:50%;
  height:100%;
  display: flex;
   flex-direction: column;
   @media(max-width:800px){
       width:100%;
   }
   text-align:center;

`
const Loader = styled.div`
  
    position:fixed;
    background-color:white;
    opacity:0.6;
   top:0;
   bottom:0;
   left:0;
   right:0;
   z-index:1000;
   display:flex;
   justify-centent:center;
   align-items:center;
`

const Header = styled.div`
  cursor:pointer;
    padding:5px 10px;
  
  height:60px;
  background-color:black;
  color:white;
  margin-inline:auto;
  margin-top:30px;
  border-radius:10px;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Input = styled.input`
  width:80%;
  height:50px;
  outline:none;
  border:0px;
  margin-top:20px;
  border-radius:10px;
 
  font-size:1.5rem;
  margin-inline:auto;
  @media(max-width:700px){
    font-size:0.8rem;
  }
`
const Box = styled.div`
   display: flex;
   flex-direction: column;
   width:50%;
   height:60%;
   align-items: center;
   background:url('girl.gif');
   background-size:cover;
   @media(max-width:800px){
       width:0px;
   }
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
 background-color:aliceblue;
 display:flex;
  
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
