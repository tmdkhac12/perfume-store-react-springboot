import { Badge, Card } from '../../../components/base/index.js';

function CheckoutRouteBlock({ routePath }) {
  return (
    <Card title="Checkout UI Module" description="Presentational UI block for checkout routes.">
      <div className="space-y-3 text-sm text-luxury-subtle">
        <p>Bound route: {routePath}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Checkout Form</Badge>
          <Badge tone="neutral">Shipping Method</Badge>
          <Badge tone="neutral">Payment Summary</Badge>
        </div>
      </div>
    </Card>
  );
}

export default CheckoutRouteBlock;
