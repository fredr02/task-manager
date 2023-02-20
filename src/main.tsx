import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import AuthContextWrapper from './components/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContextWrapper>
        <App />
      </AuthContextWrapper>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
