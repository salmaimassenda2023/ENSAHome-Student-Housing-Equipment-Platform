// hooks/useAuth.js
import { useState, useEffect } from 'react';
import userService from '../services/userService';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuthStatus = () => {
            const authenticated = userService.isAuthenticated();
            const token = userService.getAuthToken();

            if (authenticated && token && !userService.isTokenExpired(token)) {
                setIsAuthenticated(true);
                // Décoder le token pour obtenir les informations utilisateur
                const decodedUser = userService.decodeToken(token);
                setUser(decodedUser);
            } else {
                setIsAuthenticated(false);
                setUser(null);
                // Nettoyer le token expiré
                if (token && userService.isTokenExpired(token)) {
                    userService.logout();
                }
            }
            setLoading(false);
        };

        checkAuthStatus();

        // Écouter les changements de localStorage
        const handleStorageChange = (e) => {
            if (e.key === 'authToken') {
                checkAuthStatus();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        const result = await userService.login(credentials);

        if (result.success) {
            setIsAuthenticated(true);
            const token = userService.getAuthToken();
            const decodedUser = userService.decodeToken(token);
            setUser(decodedUser);
        }

        setLoading(false);
        return result;
    };

    const logout = () => {
        userService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return {
        isAuthenticated,
        loading,
        user,
        login,
        logout
    };
};