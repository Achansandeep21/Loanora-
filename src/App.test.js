import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page heading', () => {
  render(<App />);
  const heading = screen.getByText(/make your dreams/i);
  expect(heading).toBeInTheDocument();
});
