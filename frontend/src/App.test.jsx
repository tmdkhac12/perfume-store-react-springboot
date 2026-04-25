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

  it('renders login page route', async () => {
    renderRoute('/login');

    expect(await screen.findByRole('heading', { name: 'Welcome Back' })).toBeInTheDocument();
  });

  it('renders register page route', async () => {
    renderRoute('/register');

    expect(await screen.findByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('renders account profile page route', async () => {
    renderRoute('/account/profile');

    expect(await screen.findByRole('heading', { name: 'Profile Settings' })).toBeInTheDocument();
  });

  it('renders account orders page route', async () => {
    renderRoute('/account/orders');

    expect(await screen.findByRole('heading', { name: 'Order History' })).toBeInTheDocument();
  });

  it('renders account address page route', async () => {
    renderRoute('/account/address');

    expect(await screen.findByRole('heading', { name: 'Saved Addresses' })).toBeInTheDocument();
  });

  it('renders account security page route', async () => {
    renderRoute('/account/security');

    expect(await screen.findByRole('heading', { name: 'Security Settings' })).toBeInTheDocument();
  });

  it('renders admin layout for admin routes', async () => {
    renderRoute('/admin/overview');

    expect(await screen.findByRole('heading', { name: 'Admin Surface' })).toBeInTheDocument();
  });
});
