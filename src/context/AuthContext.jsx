import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing token and fetch user
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // const response = await api.get('/auth/me');
                    // setUser(response.data);

                    // Dummy user for development
                    setUser({
                        id: '1',
                        name: 'John Doe',
                        email: 'john@example.com',
                        role: 'ADMIN'
                    });
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        // const response = await api.post('/auth/login', credentials);
        // localStorage.setItem('token', response.data.token);
        // setUser(response.data.user);

        // Simulate
        localStorage.setItem('token', 'dummy-token');
        setUser({
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'ADMIN'
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
