// src/components/Reserva/PasoServicio.jsx
import { useState } from 'react';

// Servicios según base de datos
const servicios = ['Peluqueria', 'Manicura', 'Depiladora', 'Esteticista', 'Pestanas y Cejas'];

const PasoServicio = ({ avanzarPaso, actualizarFormulario }) => {
  const [seleccionado, setSeleccionado] = useState('');
  const [mostrarImagenAbajo, setMostrarImagenAbajo] = useState(false);

  const seleccionarServicio = (servicio) => {
    setSeleccionado(servicio);
    actualizarFormulario('servicio', servicio);
    setMostrarImagenAbajo(true);
    setTimeout(() => avanzarPaso(), 500);
  };

  return (
    <div className="text-center">
      <h2 className="mb-4">Selecciona un servicio</h2>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        {servicios.map((servicio) => (
          <button
            key={servicio}
            onClick={() => seleccionarServicio(servicio)}
            className={`btn ${seleccionado === servicio ? 'btn-warning' : 'btn-outline-light'} px-4 py-2`}
          >
            {servicio}
          </button>
        ))}
      </div>

      {!mostrarImagenAbajo && (
        <img
          src="/images/carrusel1.png" // ✅ ruta desde carpeta public
          alt="Carrusel 1"
          className="img-fluid rounded shadow"
          style={{ maxWidth: '650px', height: 'auto' }}
        />
      )}

      {mostrarImagenAbajo && (
        <div className="mt-5">
          <img
            src="/images/carrusel1.png" // ✅ ruta desde carpeta public
            alt="Carrusel 1"
            className="img-fluid rounded shadow"
            style={{ maxWidth: '650px', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default PasoServicio;