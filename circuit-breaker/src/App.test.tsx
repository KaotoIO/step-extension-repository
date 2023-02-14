import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders demo text', () => {
 render(<App />);
 const linkElement = screen.getByText(/Kaoto step extension for Circuit breaker/i);
 expect(linkElement).toBeInTheDocument();
});
