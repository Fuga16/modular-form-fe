import styled from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { router } from './constants/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <RouterProvider router={router} />
      </AppShell>

      <ToastContainer position="top-center" autoClose={3000} newestOnTop />
    </QueryClientProvider>
  )
}

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default App
