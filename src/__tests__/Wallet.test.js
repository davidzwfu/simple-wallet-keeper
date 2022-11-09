import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import Wallet from '../components/Wallet';

test('renders with wallet name', () => {
  render(
    <Router>
      <Wallet wallet={{ name: 'Wallet 1' }} />
    </Router>
  );
  expect(screen.getByText('Wallet 1')).toBeInTheDocument();
});