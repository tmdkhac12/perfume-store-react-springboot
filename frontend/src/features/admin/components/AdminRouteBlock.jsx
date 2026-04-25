import { Badge, Card } from '../../../components/base/index.js';

function AdminRouteBlock({ routePath }) {
  return (
    <Card title="Admin UI Module" description="Presentational UI block for admin routes.">
      <div className="space-y-3 text-sm text-luxury-subtle">
        <p>Bound route: {routePath}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Sidebar Navigation</Badge>
          <Badge tone="neutral">Dashboard Metrics</Badge>
          <Badge tone="neutral">Management Tables</Badge>
        </div>
      </div>
    </Card>
  );
}

export default AdminRouteBlock;
