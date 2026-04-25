import { Badge, Card } from '../../../components/base/index.js';

function CartRouteBlock({ routePath }) {
  return (
    <Card title="Cart UI Module" description="Presentational UI block for cart routes.">
      <div className="space-y-3 text-sm text-luxury-subtle">
        <p>Bound route: {routePath}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Cart Table</Badge>
          <Badge tone="neutral">Quantity Controls</Badge>
          <Badge tone="neutral">Order Summary</Badge>
        </div>
      </div>
    </Card>
  );
}

export default CartRouteBlock;
