import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
 render(<App />);
 const description = screen.getByText(/First we have a block of steps to run./i);
 expect(description).toBeInTheDocument();
});
