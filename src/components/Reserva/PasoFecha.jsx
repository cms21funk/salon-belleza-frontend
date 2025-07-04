//PasoFecha.jsx
import { useState } from 'react';

const PasoFecha = ({ avanzarPaso, retrocederPaso, actualizarFormulario }) => {
  const [fecha, setFecha] = useState('');

  const manejarSiguiente = () => {
    if (fecha) {
      actualizarFormulario('fecha', fecha);
      avanzarPaso();
    } else {
      alert('Por favor selecciona una fecha válida.');
    }
  };

  return (
    <div className="text-center">
      <h2 className="mb-4">Selecciona una fecha</h2>

      <input
        type="date"
        className="form-control mx-auto"
        style={{ maxWidth: '300px' }}
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        min={new Date().toISOString().split('T')[0]}
      />

      <div className="mt-4 d-flex justify-content-center gap-3">
        <button onClick={retrocederPaso} className="btn btn-secondary">← Volver</button>
        <button onClick={manejarSiguiente} className="btn btn-dark">Siguiente →</button>
      </div>
    </div>
  );
};

export default PasoFecha;
