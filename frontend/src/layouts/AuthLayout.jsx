import { Link, Outlet } from 'react-router-dom';
import { MainFooter, MainHeader, ScrollToTop } from '../components/base';

function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-on-background antialiased">
      <ScrollToTop />
      <MainHeader />

      <main className="flex flex-grow items-center justify-center px-4 py-32 md:px-8">
        <Outlet />
      </main>

      <MainFooter />
    </div>
  );
}

export default AuthLayout;
