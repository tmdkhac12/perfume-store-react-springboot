import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../features/admin/components/index.js';
import ScrollToTop from './../components/base/ScroolToTop';
import { useEffect, useRef } from 'react';

function AdminLayout() {
  const { pathname } = useLocation();
  const scrollContainerRef = useRef(null); // Create a reference to the scrool main 

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background antialiased">
      <ScrollToTop />
      <AdminSidebar />

      <main ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
