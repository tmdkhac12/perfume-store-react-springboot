import { Badge, Breadcrumbs, Card, SectionHeader } from '../components/base/index.js';
import { getFeatureRouteBlock } from '../features/index.js';

function buildBreadcrumbItems(routePath, title) {
  const segments = routePath
    .split('/')
    .filter(Boolean)
    .map((segment) => segment.replace(':productId', 'sample-id'));

  if (segments.length === 0) {
    return [{ label: 'Home' }];
  }

  return [
    { label: 'Home', to: '/' },
    ...segments.map((segment, index) => {
      const cumulativePath = `/${segments.slice(0, index + 1).join('/')}`;
      const label =
        index === segments.length - 1
          ? title
          : segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (match) => match.toUpperCase());

      return { label, to: index === segments.length - 1 ? undefined : cumulativePath };
    })
  ];
}

function RoutePlaceholderPage({ title, routePath }) {
  const breadcrumbItems = buildBreadcrumbItems(routePath, title);
  const FeatureRouteBlock = getFeatureRouteBlock(routePath);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="React Migration Bootstrap"
        title={title}
        description="This route is wired in Phase 2 with reusable foundations. Full page migration is planned in upcoming phases."
        action={<Badge tone="neutral">Foundation Layer</Badge>}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <Card title="Route Status" description="This route currently renders a shared placeholder in the new layout shell.">
        <p className="text-sm text-luxury-subtle">Mapped path: {routePath}</p>
      </Card>

      {FeatureRouteBlock ? <FeatureRouteBlock routePath={routePath} /> : null}
    </div>
  );
}

export default RoutePlaceholderPage;
