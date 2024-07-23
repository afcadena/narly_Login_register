import { createContext, useState, useContext } from 'react';
import { registerRequest, loginRequest } from '../api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authErrors, setAuthErrors] = useState(null); // Añadir estado de errores de autenticación

    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            setUser(res.data); 
            setIsAuthenticated(true);
            setAuthErrors(null); // Limpiar errores previos
            return true;
        } catch (error) {
            console.error('Error en el registro:', error);
            setAuthErrors(error.response.data.message); // Establecer errores de autenticación
            return false;
        }
    };

    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            setAuthErrors(null); // Limpiar errores previos
            return { error: false };
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            setAuthErrors(error.response.data.message); // Establecer errores de autenticación
            return { error: true };
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                signup,
                signin,
                user,
                isAuthenticated,
                authErrors // Proveer el estado de errores de autenticación
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
