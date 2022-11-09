import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import Balance from '../components/Balance';

test('renders with network name and correct eth', () => {
  render(
    <Router>
      <Balance balance={{ network: 'Testnet Goerli', value: '0' }} />
    </Router>
  );
  expect(screen.getByText('Testnet Goerli')).toBeInTheDocument();
});

test('renders with correct eth balance', () => {
  render(
    <Router>
      <Balance balance={{ network: 'Testnet Goerli', value: '100000000000000' }} />
    </Router>
  );
  expect(screen.getByText('0.0001 Eth')).toBeInTheDocument();
});

test('renders with deprecated API', () => {
  render(
    <Router>
      <Balance balance={{ network: 'Testnet Goerli', value: 'Invalid API Key' }} />
    </Router>
  );
  expect(screen.getByText('Deprecated')).toBeInTheDocument();
});