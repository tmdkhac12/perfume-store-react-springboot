function Card({ title, description, children, className = '', bodyClassName = '' }) {
  return (
    <section className={['rounded-xl border border-luxury-border bg-white p-5 shadow-sm', className].join(' ')}>
      {title ? <h2 className="font-display text-xl text-luxury-text">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm text-luxury-subtle">{description}</p> : null}
      <div className={['mt-4', bodyClassName].join(' ')}>{children}</div>
    </section>
  );
}

export default Card;
