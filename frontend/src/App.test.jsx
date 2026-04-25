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
  it('renders home page route', async () => {
    renderRoute('/');

    expect(await screen.findByRole('heading', { name: 'Find Your Signature Scent' })).toBeInTheDocument();
  });

  it('renders shop page route', async () => {
    renderRoute('/shop');

    expect(await screen.findByRole('heading', { name: 'THE COLLECTION' })).toBeInTheDocument();
  });

  it('renders product details page route', async () => {
    renderRoute('/product-details/sample-id');

    expect(await screen.findByRole('heading', { name: 'Oud Minerale' })).toBeInTheDocument();
  });

  it('renders cart page route', async () => {
    renderRoute('/cart');

    expect(await screen.findByRole('heading', { name: 'Your Cart' })).toBeInTheDocument();
  });

  it('renders checkout page route', async () => {
    renderRoute('/checkout');

    expect(await screen.findByRole('heading', { name: 'Checkout' })).toBeInTheDocument();
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
