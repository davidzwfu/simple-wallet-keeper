import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { BrowserRouter as Router} from 'react-router-dom';
import { LoginContext } from '../App';
import MainPage from '../pages/MainPage';

test('generating new wallets', async () => {
  render(
    <LoginContext.Provider value={{ decryptKey: '1234' }}>
      <Router>
        <MainPage />
      </Router>
    </LoginContext.Provider>
  );
  fireEvent.click(screen.getByText('Generate Wallet'));
  await waitFor(() => screen.getByText('Wallet 0'))
  expect(screen.getByText('Wallet 0')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Generate Wallet'));
  await waitFor(() => screen.getByText('Wallet 1'))
  expect(screen.getByText('Wallet 1')).toBeInTheDocument();
});