import { routeGroups } from '../config/route-map.js';
import RouteSurfaceLayout from './RouteSurfaceLayout.jsx';

function MainLayout() {
  return (
    <RouteSurfaceLayout
      title="Public Surface"
      description="Layout foundation for Home, Shop, Product, Cart, and Checkout routes."
      group={routeGroups.public}
    />
  );
}

export default MainLayout;
