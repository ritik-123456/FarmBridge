import { render, screen } from '@testing-library/react';
import App from './App';

test('renders FarmBridge brand', () => {
  render(<App />);
  expect(screen.getByText(/FarmBridge/i)).toBeInTheDocument();
});