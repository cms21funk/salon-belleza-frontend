//PasoHora.jsx
import { useState } from 'react';

const PasoHora = ({ avanzarPaso, retrocederPaso, actualizarFormulario }) => {
  const [hora, setHora] = useState('');

  const manejarSiguiente = () => {
    if (hora) {
      actualizarFormulario('hora', hora);
      avanzarPaso();
    } else {
      alert('Por favor selecciona una hora.');
    }
  };

  const horasDisponibles = [
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00'
  ];

  return (
    <div className="text-center">
      <h2 className="mb-4">Selecciona una hora</h2>

      <select
        className="form-select mx-auto"
        style={{ maxWidth: '300px' }}
        value={hora}
        onChange={(e) => setHora(e.target.value)}
      >
        <option value="">-- Selecciona una hora --</option>
        {horasDisponibles.map((h, i) => (
          <option key={i} value={h}>{h}</option>
        ))}
      </select>

      <div className="mt-4 d-flex justify-content-center gap-3">
        <button onClick={retrocederPaso} className="btn btn-secondary">← Volver</button>
        <button onClick={manejarSiguiente} className="btn btn-dark">Siguiente →</button>
      </div>
    </div>
  );
};

export default PasoHora;
