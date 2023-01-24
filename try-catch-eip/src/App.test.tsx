import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
 render(<App />);
 const linkElement = screen.getByText(/A very awesome Step Extension/i);
 expect(linkElement).toBeInTheDocument();
});

