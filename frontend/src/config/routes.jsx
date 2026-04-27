import AccountLayout from '../layouts/AccountLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import AccountAddressPage from '../pages/AccountAddressPage.jsx';
import AdminBrandsPage from '../pages/AdminBrandsPage.jsx';
import AdminInvoicesPage from '../pages/AdminInvoicesPage.jsx';
import AdminNotesPage from '../pages/AdminNotesPage.jsx';
import AdminOverviewPage from '../pages/AdminOverviewPage.jsx';
import AdminProductsPage from '../pages/AdminProductsPage.jsx';
import AdminUsersPage from '../pages/AdminUsersPage.jsx';
import AdminVolumesPage from '../pages/AdminVolumesPage.jsx';
import AccountOrdersPage from '../pages/AccountOrdersPage.jsx';
import AccountProfilePage from '../pages/AccountProfilePage.jsx';
import AccountSecurityPage from '../pages/AccountSecurityPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import CheckoutPage from '../pages/CheckoutPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import ProductDetailsPage from '../pages/ProductDetailsPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import RoutePlaceholderPage from '../pages/RoutePlaceholderPage.jsx';
import ShopPage from '../pages/ShopPage.jsx';

const adminRouteChildren = [
  {
    path: 'overview',
    element: <AdminOverviewPage />
  },
  {
    path: 'products',
    element: <AdminProductsPage />
  },
  {
    path: 'brands',
    element: <AdminBrandsPage />
  },
  {
    path: 'invoices',
    element: <AdminInvoicesPage />
  },
  {
    path: 'notes',
    element: <AdminNotesPage />
  },
  {
    path: 'users',
    element: <AdminUsersPage />
  },
  {
    path: 'volumes',
    element: <AdminVolumesPage />
  }
];

const authRouteChildren = [
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  }
];

const accountRouteChildren = [
  {
    path: 'profile',
    element: <AccountProfilePage />
  },
  {
    path: 'orders',
    element: <AccountOrdersPage />
  },
  {
    path: 'address',
    element: <AccountAddressPage />
  },
  {
    path: 'security',
    element: <AccountSecurityPage />
  }
];

const publicRouteChildren = [
  {
    index: true,
    element: <HomePage />
  },
  {
    path: 'shop',
    element: <ShopPage />
  },
  {
    path: 'product-details/:productId',
    element: <ProductDetailsPage />
  },
  {
    path: 'cart',
    element: <CartPage />
  },
  {
    path: 'checkout',
    element: <CheckoutPage />
  }
];

export const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      ...publicRouteChildren,
      {
        path: '*',
        element: <RoutePlaceholderPage title="Not Found" routePath="*" />
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: authRouteChildren
  },
  {
    path: '/account',
    element: <AccountLayout />,
    children: accountRouteChildren
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: adminRouteChildren
  }
];
