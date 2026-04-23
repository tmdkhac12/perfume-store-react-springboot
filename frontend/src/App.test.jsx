import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { appRoutes } from './config/routes.jsx';

function renderRoute(pathname) {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: [pathname]
  });

  render(<RouterProvider router={router} />);
}

describe('App router bootstrap', () => {
  it('renders public layout for home route', async () => {
    renderRoute('/');

    expect(await screen.findByRole('heading', { name: 'Public Surface' })).toBeInTheDocument();
  });

  it('renders auth layout for login route', async () => {
    renderRoute('/login');

    expect(await screen.findByRole('heading', { name: 'Auth Surface' })).toBeInTheDocument();
  });

  it('renders account layout for account routes', async () => {
    renderRoute('/account/profile');

    expect(await screen.findByRole('heading', { name: 'Account Surface' })).toBeInTheDocument();
  });

  it('renders admin layout for admin routes', async () => {
    renderRoute('/admin/overview');

    expect(await screen.findByRole('heading', { name: 'Admin Surface' })).toBeInTheDocument();
  });
});
