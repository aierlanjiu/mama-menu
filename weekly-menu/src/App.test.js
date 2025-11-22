import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/妈妈的小灶·爱心周记/i);
  expect(headerElement).toBeInTheDocument();
});
