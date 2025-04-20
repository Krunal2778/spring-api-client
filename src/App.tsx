import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './services/auth.context';
import ErrorBoundary from './components/layout/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import UserList from './components/users/UserList';
import UserCreate from './components/users/UserCreate';
import UserEdit from './components/users/UserEdit';
import UserProfile from './components/users/UserProfile';
import ChangePassword from './components/users/ChangePassword';
import ResetPassword from './components/users/ResetPassword';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <main className="py-4">
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  
                  {/* Protected routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/users" 
                    element={
                      <ProtectedRoute>
                        <UserList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/users/new" 
                    element={
                      <ProtectedRoute>
                        <UserCreate />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/users/:id/edit" 
                    element={
                      <ProtectedRoute>
                        <UserEdit />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/users/:id/reset-password" 
                    element={
                      <ProtectedRoute>
                        <ResetPassword />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/change-password" 
                    element={
                      <ProtectedRoute>
                        <ChangePassword />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Redirect root to dashboard if authenticated, otherwise to login */}
                  <Route 
                    path="/" 
                    element={
                      <Navigate to="/dashboard" />
                    } 
                  />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
