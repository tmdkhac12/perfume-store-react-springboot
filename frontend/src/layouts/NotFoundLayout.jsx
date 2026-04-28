import { Outlet } from 'react-router-dom';
import { MainFooter, MainHeader } from '../components/base';
import NotFoundPage from '../pages/NotFoundPage';

function NotFoundLayout() {
  return (
    <main className="flex-grow">
      <Outlet />
    </main>
  );
}

export default NotFoundLayout;
