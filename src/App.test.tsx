import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Profile from './components/Profile';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

it('renders without crashing', () => {
  render(<App />);
  expect(screen.getByTestId('welcome')).toBeInTheDocument();
});
it('renders Profile without crashing', () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
});
it('renders Home without crashing', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
});

it('renders Login without crashing', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});

it('renders Signup without crashing', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
});
