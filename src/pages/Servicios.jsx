// src/pages/Servicios.jsx
import { useState } from 'react';
import GaleriaServicio from '../components/GaleriaServicio';
import '../styles/Servicios.css';
import '../styles/global.css';

// Lista de servicios disponibles
const servicios = [
  {
    id: 'peluqueria',
    nombre: 'Peluquería',
    descripcion: 'Cortes, color, brushing, alisados y más.',
    imagen: '/src/assets/images/peluqueria.png'
  },
  {
    id: 'manicura',
    nombre: 'Manicura',
    descripcion: 'Manicure, pedicure, gel y acrílicas.',
    imagen: '/src/assets/images/unas.png'
  },
  {
    id: 'depiladora',
    nombre: 'Depilación',
    descripcion: 'Depilación tradicional y con cera.',
    imagen: '/src/assets/images/depilacion.png'
  },
  {
    id: 'esteticista',
    nombre: 'Esteticista',
    descripcion: 'Tratamientos faciales, corporales y más.',
    imagen: '/src/assets/images/esteticista.png'
  },
  {
    id: 'pestañas y cejas',
    nombre: 'Pestañas y Cejas',
    descripcion: 'Lifting, diseño de cejas, extensión de pestañas.',
    imagen: '/src/assets/images/pestanasycejas.jpg'
  }
];

const Servicios = () => {
  const [servicioActivo, setServicioActivo] = useState(null); // Servicio seleccionado

  return (
    <div className="app-bg">
      <div className="servicios-section">
        <h2 className="text-center text-light pt-5">Nuestros Servicios</h2>
        <div className="container mt-4">
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {servicios.map((servicio) => (
              <div
                key={servicio.id}
                className="card h-100 bg-black text-white servicio-card"
                style={{ width: '230px' }}
              >
                <img
                  src={servicio.imagen}
                  className="card-img-top"
                  alt={servicio.nombre}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{servicio.nombre}</h5>
                  <p className="card-text flex-grow-1">{servicio.descripcion}</p>
                  <button
                    className="btn btn-outline-light mt-3"
                    onClick={() => setServicioActivo(servicio)}
                  >
                    Ver servicios y precios
                  </button>
                </div>
              </div>
            ))}
          </div>

          {servicioActivo && (
            <GaleriaServicio
              servicio={servicioActivo}
              onCerrar={() => setServicioActivo(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Servicios;