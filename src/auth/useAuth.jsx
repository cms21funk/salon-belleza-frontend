// src/auth/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor global de autenticación
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Al iniciar la aplicación, cargar usuario desde localStorage si existe
  useEffect(() => {
    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
  }, []);

  // Función para iniciar sesión (guarda en estado y localStorage)
  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
  };

  // Función para cerrar sesión (borra estado y localStorage)
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};