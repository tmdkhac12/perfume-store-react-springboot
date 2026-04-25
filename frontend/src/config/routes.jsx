import AccountLayout from '../layouts/AccountLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import AccountAddressPage from '../pages/AccountAddressPage.jsx';
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
import { getRoutesByGroup, routeGroups } from './route-map.js';

function toRouteElement(route) {
  return <RoutePlaceholderPage title={route.label} routePath={route.path} />;
}

function toChildPath(routePath, parentPath) {
  if (routePath === parentPath) {
    return '';
  }

  if (parentPath === '/') {
    return routePath.replace(/^\//, '');
  }

  return routePath.replace(`${parentPath}/`, '');
}

function mapRoutesForParent(group, parentPath) {
  return getRoutesByGroup(group).map((route) => {
    if (route.path === '/') {
      return {
        index: true,
        element: toRouteElement(route)
      };
    }

    return {
      path: toChildPath(route.path, parentPath),
      element: toRouteElement(route)
    };
  });
}

const adminRouteChildren = mapRoutesForParent(routeGroups.admin, '/admin');

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
