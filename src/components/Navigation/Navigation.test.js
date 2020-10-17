/**
 * @file Navigation component tests.
 */

import { render, screen } from '@testing-library/react';

import Navigation, { menuItems } from './Navigation';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Navigation', () => {
  it('Should render navigation', () => {
    render(<Navigation />);

    menuItems.forEach((menuItem) =>
      expect(screen.getByText(menuItem.title)).toBeInTheDocument(),
    );
  });
});
