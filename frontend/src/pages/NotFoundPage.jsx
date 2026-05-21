import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-surface-container-low blur-3xl opacity-70" />
      <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-surface-container-high blur-3xl opacity-60" />

      <section className="relative max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex flex-col gap-12">
          <div className="space-y-4">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              Page Not Found
            </span>
            <h1 className="font-headline text-6xl md:text-7xl italic text-on-background">404</h1>
            <p className="font-headline text-3xl md:text-4xl text-on-background">
              The scent you seek is not here.
            </p>
            <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl">
              The route you visited does not exist or has been moved. You can return to the main
              gallery or explore our curated collection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors duration-300 inline-flex items-center justify-center"
            >
              Return Home
            </Link>
            <Link
              to="/shop"
              className="border border-outline-variant/40 text-on-surface px-8 py-4 rounded-full font-label text-xs uppercase tracking-[0.2em] hover:border-primary transition-colors duration-300 inline-flex items-center justify-center"
            >
              Explore Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Visit the Atelier',
                description: 'Browse curated fragrances across our signature families.'
              },
              {
                title: 'Review Your Cart',
                description: 'Continue from where you left off with your selected artifacts.'
              },
              {
                title: 'Need Assistance',
                description: 'Reach out to the concierge if you need guidance.'
              }
            ].map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-[2rem] p-6"
              >
                <h2 className="font-headline text-xl text-on-background mb-2">{item.title}</h2>
                <p className="font-body text-sm text-on-surface-variant">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFoundPage;
