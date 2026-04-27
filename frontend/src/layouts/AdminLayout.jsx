import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../features/admin/components/index.js';

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background antialiased">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
