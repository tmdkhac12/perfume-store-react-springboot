import { routeGroups } from '../config/route-map.js';
import RouteSurfaceLayout from './RouteSurfaceLayout.jsx';

function AdminLayout() {
  return (
    <RouteSurfaceLayout
      title="Admin Surface"
      description="Shared shell for admin overview, catalog operations, and management pages."
      group={routeGroups.admin}
    />
  );
}

export default AdminLayout;
