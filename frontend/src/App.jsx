import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { appRoutes } from './config/routes.jsx';

const router = createBrowserRouter(appRoutes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
