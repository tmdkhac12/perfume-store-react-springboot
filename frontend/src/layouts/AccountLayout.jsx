import { Link, NavLink, Outlet } from 'react-router-dom';
import { MainFooter, MainHeader, ScrollToTop } from '../components/base';
import AccountNav from './../components/base/AccountNav';


function AccountLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-on-background">
      <ScrollToTop />
      <MainHeader />

      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 px-4 pb-12 pt-24 md:px-8">
        <AccountNav />

        <main className="max-w-4xl flex-1">
          <Outlet />
        </main>
      </div>

      <MainFooter />
    </div>
  );
}

export default AccountLayout;
