import AccountLayout from '../layouts/AccountLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import MainLayout from '../layouts/MainLayout.jsx';
import CartPage from '../pages/CartPage.jsx';
import CheckoutPage from '../pages/CheckoutPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import ProductDetailsPage from '../pages/ProductDetailsPage.jsx';
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

const authRouteChildren = mapRoutesForParent(routeGroups.auth, '/');
const accountRouteChildren = mapRoutesForParent(routeGroups.account, '/account');
const adminRouteChildren = mapRoutesForParent(routeGroups.admin, '/admin');

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
