import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import App from '../App';
import LoginPage from '../pages/LoginPage';

test('error on password mismatch', () => {
  render(
    <App>
      <LoginPage />
    </App>
  );
  fireEvent.change(screen.getByPlaceholderText('Passcode'), {
    target: {value: '1234'},
  });
  fireEvent.change(screen.getByPlaceholderText('Confirm passcode'), {
    target: {value: '123'},
  });
  fireEvent.click(screen.getByText('Confirm'));
  expect(screen.getByText('Passcode does not match')).toBeInTheDocument();
});

test('success on password match', () => {
  render(
    <App>
      <LoginPage />
    </App>
  );
  fireEvent.change(screen.getByPlaceholderText('Passcode'), {
    target: {value: '1234'},
  });
  fireEvent.change(screen.getByPlaceholderText('Confirm passcode'), {
    target: {value: '1234'},
  });
  fireEvent.click(screen.getByText('Confirm'));
  expect(screen.getByText('Wallets')).toBeInTheDocument();
});