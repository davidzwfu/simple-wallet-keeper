import { useNavigate } from 'react-router-dom';

export default function Wallet(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/wallet', { state: props.wallet });
  }

  return (
    <div className="wallet" onClick={handleClick}>
      <span>{props.wallet.name}</span>
    </div>
  );
}


