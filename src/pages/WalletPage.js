import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Balance from '../components/Balance';
const apiKey = 'P2BMP4CH7NGMTKBAAXYTJNJZ961ZNG5TUK';
//const bscKey = 'FGRY4G2Z4YH7BIRPHKB4B47JMIN56MIAUP';

export default function WalletPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const wallet = location.state;
  const [balances, setBalances] = useState([
    { network: 'Testnet Goerli', url: 'https://api-goerli.etherscan.io', value: 'Loading..' },
    { network: 'Testnet Sepolia', url: 'https://api-sepolia.etherscan.io', value: 'Loading..' },
    { network: 'Testnet RInkeby', url: 'https://api-rinkeby.etherscan.io', value: 'Loading..' },
    { network: 'Testnet Ropsten', url: 'https://api-ropsten.etherscan.io', value: 'Loading..' },
    { network: 'Testnet BSC', url: 'https://api-testnet.bscscan.com', value: 'Loading..' }
  ]);

  useEffect(() => {
    balances.forEach((item, index) => {
      getBalance(item.url, index);
    });
  }, []);

  function getBalance(url, index) {
    axios.get(`${url}/api?module=account&action=balance&address=${wallet.address}&tag=latest&apikey=${apiKey}`)
      .then(res => {
        let balancesCopy = [...balances];
        balancesCopy[index].value = res.data.result;
        setBalances(balancesCopy);
      });
  }

  function handleClick() {
    navigate('/', { state: wallet });
  }

  return (
    <div className="view-wallet">
      <button className="back-button" onClick={() => navigate('/main')}>Back</button>
      <h1 className="main__title">{wallet.name}</h1>
      <button onClick={handleClick}>
        Private Key
      </button>
      <div className="view-wallet__balances">
        {balances.map((item, index) => {
          return <Balance key={index} balance={item} />
        })}
      </div>
    </div>
  );
}


