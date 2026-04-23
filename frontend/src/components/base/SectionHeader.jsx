function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div className="space-y-2">
        {eyebrow ? <p className="text-xs uppercase tracking-[0.2em] text-luxury-muted">{eyebrow}</p> : null}
        {title ? <h2 className="font-display text-2xl text-luxury-text md:text-3xl">{title}</h2> : null}
        {description ? <p className="max-w-2xl text-sm text-luxury-subtle md:text-base">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export default SectionHeader;
