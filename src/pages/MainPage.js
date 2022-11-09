import React, { useState, useEffect, useRef, useContext } from 'react';
import { LoginContext } from '../App';
import Wallet from '../components/Wallet';
const ethers = require('ethers');
const cryptojs = require("crypto-js");

export default function MainPage() {
  const context = useContext(LoginContext);
  const decryptKey = context.decryptKey;
  const idRef = useRef(0);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const walletStore = JSON.parse(localStorage.getItem("walletStore")) || [];
    idRef.current = walletStore.length;
    setWallets(walletStore);
  }, []);

  function generateWallet() {
    setTimeout(() => {
      const newWallet = ethers.Wallet.createRandom();
      const privateKey = cryptojs.AES.encrypt(newWallet.privateKey, decryptKey).toString(); //Encrypt privateKey with user's passcode
      const updateWallets = [...wallets, { 
        name: `Wallet ${idRef.current++}`, 
        address: newWallet.address,
        privateKey: privateKey
      }];
      setWallets(updateWallets);
      localStorage.setItem('walletStore', JSON.stringify(updateWallets));
    }, 10);
  }

  return (
    <div className="main">
      <h1 className="main__title">Wallets</h1>
      <button onClick={generateWallet}>
        Generate Wallet
      </button>
      <div className="wallets">
        {wallets.map((item, index) => {
          return <Wallet key={index} wallet={item} />
        })}
      </div>
    </div>
  );
}


