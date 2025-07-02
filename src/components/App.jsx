import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './login/LoginForm';
import Requests from './requests/Requests';
import RequestsArchive from './requests-archive/RequestsArchive';

function RequireAuth({ children }) {
  const token = localStorage.getItem('tokens');
  const location = useLocation();
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  try {
    const tokens = JSON.parse(token);
    if (!tokens.access) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } catch (err) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={
          <RequireAuth>
            <Navigate to="/requests" replace />
          </RequireAuth>
        } />
        <Route path="/requests" element={
          <RequireAuth>
            <Requests />
          </RequireAuth>
        } />
        <Route path="/requests-archive" element={
          <RequireAuth>
            <RequestsArchive />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
