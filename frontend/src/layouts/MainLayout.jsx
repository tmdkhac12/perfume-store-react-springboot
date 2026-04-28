import { Outlet } from 'react-router-dom';
import { MainFooter, MainHeader, ScrollToTop } from '../components/base';

function MainLayout() {
  return (
    <div className="bg-background text-on-surface font-body antialiased selection:bg-primary selection:text-on-primary min-h-screen flex flex-col">
      <ScrollToTop />
      <MainHeader />

      <main className="flex-grow">
        <Outlet />
      </main>

      <MainFooter />
    </div>
  );
}

export default MainLayout;
