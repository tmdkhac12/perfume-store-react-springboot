export const routeGroups = Object.freeze({
  public: 'public',
  auth: 'auth',
  account: 'account',
  admin: 'admin'
});

export const routeMap = [
  { path: '/', label: 'Home', group: routeGroups.public },
  { path: '/shop', label: 'Shop', group: routeGroups.public },
  { path: '/product-details/:productId', label: 'Product Details', group: routeGroups.public },
  { path: '/cart', label: 'Cart', group: routeGroups.public },
  { path: '/checkout', label: 'Checkout', group: routeGroups.public },
  { path: '/login', label: 'Login', group: routeGroups.auth },
  { path: '/register', label: 'Register', group: routeGroups.auth },
  { path: '/account/profile', label: 'Account Profile', group: routeGroups.account },
  { path: '/account/orders', label: 'Account Orders', group: routeGroups.account },
  { path: '/account/address', label: 'Account Address', group: routeGroups.account },
  { path: '/account/security', label: 'Account Security', group: routeGroups.account },
  { path: '/admin/overview', label: 'Admin Overview', group: routeGroups.admin },
  { path: '/admin/products', label: 'Admin Products', group: routeGroups.admin },
  { path: '/admin/brands', label: 'Admin Brands', group: routeGroups.admin },
  { path: '/admin/invoices', label: 'Admin Invoices', group: routeGroups.admin },
  { path: '/admin/notes', label: 'Admin Notes', group: routeGroups.admin },
  { path: '/admin/users', label: 'Admin Users', group: routeGroups.admin },
  { path: '/admin/volumes', label: 'Admin Volumes', group: routeGroups.admin }
];

export function resolveRoutePath(path) {
  if (path.includes(':productId')) {
    return path.replace(':productId', 'sample-id');
  }

  return path;
}

export function getRoutesByGroup(group) {
  return routeMap.filter((route) => route.group === group);
}
