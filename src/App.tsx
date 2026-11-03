import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

import { ToastContainer } from 'react-toastify';

import { router } from './constants/routes';
import { ThemeSwitcher } from './design-system/components/ThemeSwitcher/ThemeSwitcher';
import { queryClient } from './lib/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSwitcher />
      <RouterProvider router={router} />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
      />
    </QueryClientProvider>
  );
}

export default App;
