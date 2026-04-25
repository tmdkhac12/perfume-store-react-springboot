import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div
      className="w-full max-w-6xl overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
      style={{ boxShadow: '0 4px 60px rgba(25, 28, 29, 0.04)' }}
    >
      <div className="flex flex-col lg:flex-row">
        <div className="relative min-h-[400px] lg:w-1/2 lg:min-h-full">
          <img
            alt="Perfume bottle on stone"
            className="absolute inset-0 h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNfZzLBCPKFe6znApmx-nb8e8kJ6MriN0sRkoHf-K1YahqMI9wIK11SCm2X5qlnAaoPKjtA7VIX2FtSsBZxnxMeN9n3ITPW7u5YTlbeihNzXJHjSDDq95ceEA5wsPtoxQ-ZfM5p4coPwiCisTEj_HiI06YFBUVYA5VL0_mPTHXTxGJXsj0f0Vll-UcH7RBPL-lcZ1XY89hEGmS0_0dPKkEqB2WNUmE2HmU2GWe1Ym1_mE9B5Uw-h5llMh4KbGIvxEn4o15FdAp_N8"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="flex flex-col justify-center bg-surface-container-lowest p-8 md:p-16 lg:w-1/2 lg:p-20">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-12 text-center lg:text-left">
              <h1 className="mb-4 font-headline text-3xl text-on-surface md:text-4xl">Create Account</h1>
              <p className="text-sm tracking-wide text-on-surface-variant">
                Join The Atelier to access exclusive collections and curated stories.
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                  id="fullName"
                  name="fullName"
                  placeholder="Jane Doe"
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                  id="email"
                  name="email"
                  placeholder="jane@example.com"
                  type="email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.15em] text-on-surface-variant" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="w-full rounded-full border border-outline-variant/30 bg-transparent px-4 py-3 text-sm text-on-surface transition-colors duration-300 focus:border-primary focus:ring-0"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                />
              </div>

              <div className="space-y-4 pt-4">
                <button
                  className="w-full rounded-full bg-primary py-4 text-xs uppercase tracking-[0.15em] text-on-primary transition-colors duration-300 hover:bg-secondary"
                  type="button"
                >
                  Create Account
                </button>

                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant/30" />
                  </div>
                  <span className="relative bg-surface-container-lowest px-4 text-xs uppercase tracking-[0.1em] text-on-surface-variant">
                    Or
                  </span>
                </div>

                <button
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-outline-variant/20 bg-transparent py-4 text-xs uppercase tracking-[0.15em] text-on-surface transition-colors duration-300 hover:bg-surface-container-low"
                  type="button"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign up with Google
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account?{' '}
                <Link className="text-primary underline decoration-1 underline-offset-4 transition-colors hover:text-secondary" to="/login">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
