import { routeGroups } from '../config/route-map.js';
import RouteSurfaceLayout from './RouteSurfaceLayout.jsx';

function AccountLayout() {
  return (
    <RouteSurfaceLayout
      title="Account Surface"
      description="Shared shell for profile, orders, addresses, and security pages."
      group={routeGroups.account}
    />
  );
}

export default AccountLayout;
