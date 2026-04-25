import { Badge, Card } from '../../../components/base/index.js';

function UserAccountRouteBlock({ routePath }) {
  return (
    <Card title="User Account UI Module" description="Presentational UI block for account routes.">
      <div className="space-y-3 text-sm text-luxury-subtle">
        <p>Bound route: {routePath}</p>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Profile Panel</Badge>
          <Badge tone="neutral">Address Book</Badge>
          <Badge tone="neutral">Security Settings</Badge>
        </div>
      </div>
    </Card>
  );
}

export default UserAccountRouteBlock;
