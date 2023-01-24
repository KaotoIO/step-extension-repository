import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const applyBtn = screen.getByTestId('choice-apply-button');
  expect(applyBtn).toBeInTheDocument();
});
