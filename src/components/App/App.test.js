/**
 * @file App component tests.
 */

import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('Should render', () => {
    render(<App />);

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
