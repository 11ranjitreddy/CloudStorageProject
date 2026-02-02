import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const FileManager = React.lazy(() => import('./pages/FileManager/FileManager'));
const Logs = React.lazy(() => import('./pages/Logs/Logs'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const AuthLayout = React.lazy(() => import('./pages/Auth/AuthLayout'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center">Loading session...</div>;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <React.Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
                <Routes>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route index element={<Navigate to="/auth/login" replace />} />
                    </Route>

                    <Route path="/" element={
                        <ProtectedRoute>
                            <Navigate to="/dashboard" replace />
                        </ProtectedRoute>
                    } />

                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />

                    <Route path="/files" element={
                        <ProtectedRoute>
                            <FileManager />
                        </ProtectedRoute>
                    } />

                    <Route path="/activities" element={
                        <ProtectedRoute>
                            <Logs />
                        </ProtectedRoute>
                    } />

                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    } />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </React.Suspense>
            <ToastContainer position="bottom-right" theme="colored" />
        </AuthProvider>
    );
}

export default App;
