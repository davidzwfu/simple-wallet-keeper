import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../App';
const cryptojs = require("crypto-js");

export default function PrivateKeyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const wallet = location.state;
  const context = useContext(LoginContext);
  const decryptKey = context.decryptKey;
  const [decrypted, setDecrypted] = useState('Decrypting..');

  useEffect(() => {
    const bytes  = cryptojs.AES.decrypt(wallet.privateKey, decryptKey);
    setDecrypted(bytes.toString(cryptojs.enc.Utf8));
  }, []);

  return (
    <div className="view-wallet">
      <button className="back-button" onClick={() => navigate('/wallet', { state: wallet })}>Back</button>
      <h1 className="main__title">Private Key</h1>
      <div className="view-wallet__balances">
        {decrypted}
      </div>
      <p className="login__text">DO NOT share your private key to anyone as this gives full access to your wallet!</p>
    </div>
  );
}


