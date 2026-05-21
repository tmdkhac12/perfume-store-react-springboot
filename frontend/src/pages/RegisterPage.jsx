import { Link } from 'react-router-dom';
import { RegisterForm } from '../features/auth';

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
              <h1 className="mb-4 font-headline text-3xl text-on-surface md:text-4xl">
                Create Account
              </h1>
              <p className="text-sm tracking-wide text-on-surface-variant">
                Join The Atelier to access exclusive collections and curated stories.
              </p>
            </div>

            <RegisterForm />

            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account?{' '}
                <Link
                  className="text-primary underline decoration-1 underline-offset-4 transition-colors hover:text-secondary"
                  to="/login"
                >
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
