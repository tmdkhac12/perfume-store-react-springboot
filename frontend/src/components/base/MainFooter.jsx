import { Link } from 'react-router-dom';

function MainFooter() {
  return (
    <footer className="w-full bg-surface border-t border-outline-variant/30 py-20 px-8 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-20">
        <div className="col-span-1 lg:col-span-2">
          <Link className="font-headline text-2xl font-light tracking-tighter text-primary inline-block mb-8" to="/">
            PerfumeStore
          </Link>
          <p className="font-body text-on-surface-variant text-sm max-w-sm mb-8">
            Discover our curated collection of rare, handcrafted fragrances designed to articulate your unique presence.
          </p>
          <div className="max-w-md relative">
            <h4 className="font-label text-xs uppercase tracking-[0.1em] text-on-surface mb-4">Subscribe to our newsletter</h4>
            <form className="relative group" onSubmit={(event) => event.preventDefault()}>
              <input
                className="w-full bg-surface-container-low border-none rounded-full py-4 pl-6 pr-32 font-body text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 transition-shadow outline-none"
                placeholder="Enter your email"
                required
                type="email"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-on-primary font-label text-xs uppercase tracking-[0.1em] px-6 rounded-full transition-colors duration-300 hover:bg-secondary flex items-center justify-center min-w-[100px]" type="submit">
                <span className="submit-text">Subscribe</span>
                <span className="material-symbols-outlined loading-icon hidden animate-spin text-[16px]">progress_activity</span>
                <span className="material-symbols-outlined success-icon hidden text-[16px]">check</span>
              </button>
            </form>
          </div>
        </div>
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-6">Contact</h4>
          <ul className="space-y-4">
            <li>
              <a className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors" href="mailto:hello@perfumestore.com">
                hello@perfumestore.com
              </a>
            </li>
            <li>
              <a className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors" href="tel:+1234567890">
                +1 (234) 567-890
              </a>
            </li>
            <li className="font-body text-sm text-on-surface-variant mt-6">
              123 Fragrance Lane
              <br />
              Paris, France 75001
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-6">Explore</h4>
          <ul className="space-y-4">
            <li>
              <Link className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors" to="/shop">
                About Us
              </Link>
            </li>
            <li>
              <Link className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors" to="/shop">
                Store Locator
              </Link>
            </li>
            <li>
              <Link className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors" to="/shop">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors" to="/shop">
                Privacy Policy
              </Link>
            </li>
          </ul>
          <div className="flex gap-4 mt-8 text-on-surface-variant">
            <Link className="hover:text-primary transition-colors" to="/shop">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </Link>
            <Link className="hover:text-primary transition-colors" to="/shop">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-outline-variant/30">
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-4 md:mb-0">© 2024 PerfumeStore. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors" to="/shop">
            Terms of Service
          </Link>
          <Link className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors" to="/shop">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;