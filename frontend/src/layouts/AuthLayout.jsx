import { routeGroups } from '../config/route-map.js';
import RouteSurfaceLayout from './RouteSurfaceLayout.jsx';

function AuthLayout() {
  return (
    <RouteSurfaceLayout
      title="Auth Surface"
      description="Shared shell for login and registration routes."
      group={routeGroups.auth}
    />
  );
}

export default AuthLayout;
