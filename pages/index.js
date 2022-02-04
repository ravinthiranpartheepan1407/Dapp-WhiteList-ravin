import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import web3Modal from "web3modal";
import {providers, Contract} from "ethers";
import {useEffect, useRef, useState} from "react";
import {WHITELISTED_CONTRACT, abi} from "../constants";
import Header from './Header';
import Footer from './Footer';
export default function Home() {

  const[walletConnected, setWalletConnected] = useState(false);
  const[joinedWhiteList, setJoinedWhiteList] = useState(false);
  const[loading, setLoading] = useState(false);
  const[numberOfWhiteListed, setNumberOfWhiteListed] = useState(0);
  const web3ModalRef = useRef();


//Connect Wallet function


  const getProviderOrSigner = async(needSigner = false) =>{
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const {chainId} = await web3Provider.getNetwork();
    if(chainId !== 4){
      window.alert("Change Network To Rinkeby");
      throw new Error("Change Network to Rinkeby");
    }

    if(needSigner){
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };


//Add Current Wallet to whitelist array

const addAddressToWhiteList = async() =>{
  try{
    const signer = await getProviderOrSigner(true);
    const whitelistContract = new Contract(
      WHITELISTED_CONTRACT, abi, signer
    );

    const tx = await whitelistContract.addAddressToWhiteList();
    setLoading(true);
    await tx.wait();
    setLoading(false);

    await getNumberOfWhiteListed();
    setJoinedWhiteList(true);
  } catch(err){
    console.log(err);
  }
};

 const getNumberOfWhiteListed = async() =>{
   try{
     const provider = await getProviderOrSigner();
     const whitelistContract = new Contract(WHITELISTED_CONTRACT, abi, provider);
     const _numberOfWhiteListed = await whitelistContract.numAddressWhiteListed();
     setNumberOfWhiteListed(_numberOfWhiteListed);
   } catch(err){
     console.log(err);
   }
 };

 const checkIfAddressInWhiteList = async() =>{
   try{
     const signer = await getProviderOrSigner(true);
     const whitelistContract = new Contract(WHITELISTED_CONTRACT, abi, signer);
     const address = await signer.getAddress();
     const _joinedWhiteListAddress = await whitelistContract.whiteListedAddresses(address);
     setJoinedWhiteList(_joinedWhiteListAddress);
   } catch(err){
     console.log(err);
   }
 };

 const connectWallet = async() =>{
   try{
     await getProviderOrSigner();
     setWalletConnected(true);

     checkIfAddressInWhiteList();
     getNumberOfWhiteListed();
   } catch(err){
     console.log(err);
   }
 };

 const renderButton = () =>{
   if(walletConnected){
     if(joinedWhiteList){
       return(
         <div>
            <h1 className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> Thanks for joining Azog Whitelist! </h1>
         </div>
       );
     } else if(loading){
       return(<div><button>Loading...</button></div>);
     } else{
       return(<div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={addAddressToWhiteList}>Join Azog Waitlist</button></div>);
     }
   } else{
     return(<div className="block p-6 max-w-sm rounded-lg bg-blue-500 dark:hover:bg-gray-700"><button onClick={connectWallet}>Connect Your Wallet</button></div>);
   }
 };

 useEffect(()=>{
   if(!walletConnected){
     web3ModalRef.current = new web3Modal({
       network: "rinkeby",
       providerOptions: {},
       disableInjectedProvider: false,
     });
     connectWallet();
   }
 }, [walletConnected]);

  return (
    <div className="p-5">
    <Header />
    <div className="bg-gray-900 h-56 grid grid-cols-4 text-white gap-4 content-evenly">
      <h1 className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> Welcome To Azog Community </h1>
      <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"> It is an NFT-DAO based Community </div>
      <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        {numberOfWhiteListed} have already joined the whitelist
      </div>
      {renderButton()}
    </div>
    <Footer />
    </div>

  );
}
