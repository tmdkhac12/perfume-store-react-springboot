import { Badge, Card } from '../../../components/base/index.js';

function CatalogRouteBlock({ routePath }) {
  return (
    <Card title="Catalog UI Module" description="Presentational UI block for catalog-facing routes.">
      <div className="space-y-3 text-sm text-luxury-subtle">
        <p>Bound route: {routePath}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Home Hero</Badge>
          <Badge tone="neutral">Category Grid</Badge>
          <Badge tone="neutral">Best Sellers</Badge>
        </div>
      </div>
    </Card>
  );
}

export default CatalogRouteBlock;
