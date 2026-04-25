import { Badge, Card } from '../../../components/base/index.js';

function ProductRouteBlock({ routePath }) {
  return (
    <Card title="Product UI Module" description="Presentational UI block for product detail routes.">
      <div className="space-y-3 text-sm text-luxury-subtle">
        <p>Bound route: {routePath}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Product Gallery</Badge>
          <Badge tone="neutral">Fragrance Notes</Badge>
          <Badge tone="neutral">Product Summary</Badge>
        </div>
      </div>
    </Card>
  );
}

export default ProductRouteBlock;
