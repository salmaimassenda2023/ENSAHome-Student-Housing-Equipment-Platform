// userService.js - Service pour gérer les appels API d'authentification

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Utilitaire pour gérer les requêtes HTTP
const apiRequest = async (url, options = {}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    // Ajouter le token d'authentification si disponible
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

const userService = {
    // Inscription d'un nouvel utilisateur
    register: async (userData) => {
        try {
            const user = await apiRequest('/register', {
                method: 'POST',
                body: JSON.stringify(userData),
            });
            return { success: true, data: user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Connexion utilisateur
    login: async (credentials) => {
        try {
            const response = await apiRequest('/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            });

            // Stocker le token dans le localStorage
            if (response.token) {
                localStorage.setItem('authToken', response.token);
            }

            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Déconnexion utilisateur
    logout: () => {
        localStorage.removeItem('authToken');
        // Optionnel: rediriger vers la page de connexion
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    },

    // Mise à jour du profil utilisateur
    updateProfile: async (userData) => {
        try {
            const user = await apiRequest('/user/profile', {
                method: 'PUT',
                body: JSON.stringify(userData),
            });
            return { success: true, data: user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Mise à jour du mot de passe
    updatePassword: async (passwordData) => {
        try {
            const response = await apiRequest('/user/password', {
                method: 'PUT',
                body: JSON.stringify(passwordData),
            });
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Test de connexion au serveur
    testConnection: async () => {
        try {
            const response = await apiRequest('/hello');
            return { success: true, data: response };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Vérifier si l'utilisateur est connecté
    isAuthenticated: () => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('authToken') !== null;
    },

    // Obtenir le token d'authentification
    getAuthToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('authToken');
    },

    // Décoder le token JWT (basique - pour des informations non sensibles)
    decodeToken: (token) => {
        try {
            if (!token) return null;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    },

    // Vérifier si le token est expiré
    isTokenExpired: (token) => {
        const decoded = userService.decodeToken(token);
        if (!decoded || !decoded.exp) return true;
        return Date.now() >= decoded.exp * 1000;
    },
};

export default userService;