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
  const [authErrors, setAuthErrors] = useState(null);

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      setAuthErrors(null);
      return true;
    } catch (error) {
      console.error('Error en el registro:', error);
      setAuthErrors(error.message); // Cambiar a error.message para mostrar el mensaje de error
      return false;
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setAuthErrors(null);
      return { success: true };
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setAuthErrors(error.message); // Cambiar a error.message para mostrar el mensaje de error
      return { success: false, error: error.message };
    }
  }

  return (
    <AuthContext.Provider 
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        authErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
