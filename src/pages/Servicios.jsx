import { useState } from 'react';
import GaleriaServicio from '../components/GaleriaServicio';
import '../styles/Servicios.css';
import '../styles/global.css';

// Lista de servicios disponibles (id corregido para coincidir con la BD)
const servicios = [
  {
    id: 'Peluqueria', // ✅ sin tilde, como en la BD
    nombre: 'Peluquería',
    descripcion: 'Cortes, color, brushing, alisados y más.',
    imagen: '/images/peluqueria.png'
  },
  {
    id: 'Manicura', // ✅ coincide con BD
    nombre: 'Manicura',
    descripcion: 'Manicure, pedicure, gel y acrílicas.',
    imagen: '/images/unas.png'
  },
  {
    id: 'Depiladora', // ✅ correcto (en la BD no es "Depilación", sino "Depiladora")
    nombre: 'Depilación',
    descripcion: 'Depilación tradicional y con cera.',
    imagen: '/images/depilacion.png'
  },
  {
    id: 'Esteticista',
    nombre: 'Esteticista',
    descripcion: 'Tratamientos faciales, corporales y más.',
    imagen: '/images/esteticista.png'
  },
  {
    id: 'Pestanas y Cejas', // ✅ sin tilde para que coincida con la BD
    nombre: 'Pestañas y Cejas',
    descripcion: 'Lifting, diseño de cejas, extensión de pestañas.',
    imagen: '/images/pestanasycejas.jpg'
  }
];

const Servicios = () => {
  const [servicioActivo, setServicioActivo] = useState(null);

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