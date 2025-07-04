// src/staff/PanelStaff.jsx
import { useAuth } from '../auth/useAuth';
import { Link } from 'react-router-dom';

const PanelStaff = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5 text-white">
      {/* Título de bienvenida */}
      <h2>Bienvenida {user?.email}</h2>
      <p className="lead">
        Este es tu panel de profesional. Desde aquí puedes revisar tu desempeño, comentarios y calificaciones.
      </p>

      {/* Opciones del panel */}
      <div className="row mt-4">
        {/* Acceso al desempeño */}
        <div className="col-md-6 mb-4">
          <div className="card bg-dark text-white h-100 p-4">
            <h4>Mi Desempeño</h4>
            <p>Revisa tus comentarios, likes y calificaciones.</p>
            <Link to="/staff/desempeno" className="btn btn-warning mt-3">
              Ver mi desempeño
            </Link>
          </div>
        </div>

        {/* Acceso a observaciones del admin */}
        <div className="col-md-6 mb-4">
          <div className="card bg-dark text-white h-100 p-4">
            <h4>Observaciones del Administrador</h4>
            <p>Lee las observaciones que el administrador ha registrado sobre tu trabajo.</p>
            <Link to="/staff/observaciones" className="btn btn-outline-light mt-3">
              Ver observaciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelStaff;