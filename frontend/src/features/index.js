import { AdminRouteBlock } from './admin/index.js';
import { AuthRouteBlock } from './auth/index.js';
import { CartRouteBlock } from './cart/index.js';
import { CatalogRouteBlock } from './catalog/index.js';
import { CheckoutRouteBlock } from './checkout/index.js';
import { ProductRouteBlock } from './product/index.js';
import { UserAccountRouteBlock } from './userAccount/index.js';

export function getFeatureRouteBlock(routePath) {
  if (routePath === '*' || !routePath) {
    return null;
  }

  if (routePath === '/' || routePath === '/shop') {
    return CatalogRouteBlock;
  }

  if (routePath.startsWith('/product-details/')) {
    return ProductRouteBlock;
  }

  if (routePath === '/cart') {
    return CartRouteBlock;
  }

  if (routePath === '/checkout') {
    return CheckoutRouteBlock;
  }

  if (routePath === '/login' || routePath === '/register') {
    return AuthRouteBlock;
  }

  if (routePath.startsWith('/account/')) {
    return UserAccountRouteBlock;
  }

  if (routePath.startsWith('/admin/')) {
    return AdminRouteBlock;
  }

  return null;
}
