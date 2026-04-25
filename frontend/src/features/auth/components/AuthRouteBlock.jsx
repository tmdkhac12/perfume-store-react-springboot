import { Badge, Card } from '../../../components/base/index.js';

function AuthRouteBlock({ routePath }) {
  return (
    <Card title="Auth UI Module" description="Presentational UI block for authentication routes.">
      <div className="space-y-3 text-sm text-luxury-subtle">
        <p>Bound route: {routePath}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Login Form UI</Badge>
          <Badge tone="neutral">Register Form UI</Badge>
          <Badge tone="neutral">Auth Header</Badge>
        </div>
      </div>
    </Card>
  );
}

export default AuthRouteBlock;
