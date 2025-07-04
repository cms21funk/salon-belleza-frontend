// src/components/ProteccionRutas.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

// Componente para proteger rutas según roles permitidos
const ProteccionRutas = ({ children, rolesPermitidos }) => {
  const { usuario } = useAuth(); // Obtener usuario autenticado

  // Si no está autenticado, redirige al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol del usuario no está permitido, redirige al inicio
  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProteccionRutas;