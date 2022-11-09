const ethers = require('ethers');

export default function Balance(props) {

  function convertBalance(value) {
    if (value.toLowerCase().includes('invalid api'))
      return 'Deprecated'
    else if (isNaN(value))
      return value;
    else
      return ethers.utils.formatEther(value) + ' Eth';
  }

  return (
    <div className="view-wallet__balance">
      <span>{props.balance.network}</span>
      <span>{convertBalance(props.balance.value)}</span>
    </div>
  );
}


