function AccountPageHeader({ title, description }) {
  return (
    <div className="mb-12">
      <h1 className="mb-4 font-headline text-4xl text-on-background">{title}</h1>
      {description ? <p className="text-sm text-on-surface-variant">{description}</p> : null}
    </div>
  );
}

export default AccountPageHeader;