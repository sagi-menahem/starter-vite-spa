/**
 * App Component
 *
 * Root application component that sets up the router.
 */

import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
