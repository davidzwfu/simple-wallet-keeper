import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginContext } from '../App';
const bcrypt = require('bcryptjs');

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const wallet = location.state;
  const context = useContext(LoginContext);
  const setDecryptKey = context.setDecryptKey;
  const setIsLoggedIn = context.setIsLoggedIn;
  const passwordHash = localStorage.getItem('passwordHash') || '';
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    setPass(e.target.value);
  }
  function handleConfirm(e) {
    setConfirmPass(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!passwordHash) {
      if (pass !== confirmPass)
        setError('Passcode does not match');
      else {
        loginToMain();
      }
    }
    else {
      const isPasswordCorrect = bcrypt.compareSync(pass, passwordHash);
      if (isPasswordCorrect) {
        if (wallet) //coming from WalletPage
          navigate('/private', { state: wallet });
        else {
          loginToMain();
        }
      }
      else
        setError('Invalid passcode');
    }
  }

  function loginToMain() {
    if (!passwordHash) {
      localStorage.setItem('passwordHash', bcrypt.hashSync(pass, 10));
      localStorage.removeItem('walletStore');
    }
    setIsLoggedIn(true);
    setDecryptKey(pass); //save passcode for privateKey encryption/decryption
    navigate('/main');
  }

  return (
    <>
      <div className="login">
        <h3 className="login__title">{!passwordHash ? 'Create' : 'Enter'} Passcode</h3>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="Passcode" value={pass} onChange={handleChange} />
          {!passwordHash && <input type="password" placeholder="Confirm passcode" value={confirmPass} onChange={handleConfirm} />}
          <div className="login__row">
            <p className="login__error">{error}</p>
            <input type="submit" value="Confirm" />
          </div>
        </form>
        <p className="login__text">Passcode adds an extra layer of security when using the app</p>
      </div>
    </>
  );
}


