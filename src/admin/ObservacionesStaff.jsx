import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ObservacionesStaff = () => {
  const [profesionales, setProfesionales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProfesionales = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/usuarios`);
        const data = await response.json();
        const staff = data.filter((usuario) => usuario.rol === 'staff');
        setProfesionales(staff);
      } catch (error) {
        console.error('Error al obtener profesionales:', error);
      }
    };

    obtenerProfesionales();
  }, []);

  const irAObservaciones = (id) => {
    navigate(`/admin/observaciones/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-white">Observaciones del Staff</h2>
      <div className="row">
        {profesionales.map((profesional) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4" key={profesional.id}>
            <div className="card bg-black text-white">
              <img
                src={`${BASE_URL}/images/${profesional.imagen}`}
                className="card-img-top"
                alt={profesional.nombre}
                style={{ height: '250px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{profesional.nombre}</h5>
                <p className="card-text">{profesional.especialidad}</p>
                <button
                  className="btn btn-outline-warning w-100 btn-sm"
                  onClick={() => irAObservaciones(profesional.id)}
                >
                  Dejar comentario
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObservacionesStaff;