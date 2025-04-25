
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client with more verbose error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      onError: (error: Error) => {
        console.error('React Query Global Error Handler:', error);
      }
    },
    mutations: {
      onError: (error) => {
        console.error('React Query Mutation Error:', error);
      },
    },
  },
});

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
