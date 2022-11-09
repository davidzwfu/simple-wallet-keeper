import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router} from 'react-router-dom';
import { LoginContext } from '../App';
import PrivateKeyPage from '../pages/PrivateKeyPage';

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

test('successfully decrypts privateKey using passcode', () => {
  render(
    <LoginContext.Provider value={{ decryptKey: '1234' }}>
      <Router>
        <PrivateKeyPage />
      </Router>
    </LoginContext.Provider>
  );
  expect(screen.getByText('0xd16d3673d4e936357a49a8e5cf4a17f298a92691a86c0ecacc007f9c8603a9e9')).toBeInTheDocument();
});