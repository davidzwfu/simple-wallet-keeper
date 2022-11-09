import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router} from 'react-router-dom';
import WalletPage from '../pages/WalletPage';

jest.mock("react-router-dom", () => {
	return {
		...jest.requireActual("react-router-dom"),
		useLocation: () => {
			return {
				state: {
          name: 'Wallet 7',
          address: '0x908eC652AA42A652b6D07f18A6a39242B480e1c2',
          privateKey: 'U2FsdGVkX1+gkcYHM5G1RtHNQx8gYTzjOSx8RaTisGdF1at1VfHxLQROM3iFwH8uxqA7R505oUrfr58YpO5i3SHKtwPs5J1CDiokiqiSF6KDsgYadv00RBFjDNjuoeOv'
        }
			}
    }
	};
});

test('renders with wallet info from route state', () => {
  render(
    <Router>
      <WalletPage />
    </Router>
  );
  expect(screen.getByText('Wallet 7')).toBeInTheDocument();
});