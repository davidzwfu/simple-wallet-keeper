import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders LoginPage on start', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Passcode')).toBeInTheDocument();
});