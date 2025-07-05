import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ResumenReserva.css'; // Asegúrate de crear este CSS

const ResumenReserva = ({ formulario, retrocederPaso }) => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const manejarEnvio = async () => {
    try {
      if (!formulario.profesional_id || !formulario.profesional) {
        alert('Debes seleccionar una profesional antes de continuar.');
        return;
      }

      const res = await fetch('https://salon-belleza-backend.onrender.com/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulario),
      });

      if (res.ok) {
        setMostrarModal(true);
      } else if (res.status === 409) {
        const data = await res.json();
        alert(`${data.error}`);
      } else {
        alert('Error al enviar la reserva. Inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      alert('Ocurrió un error al procesar la reserva.');
    }
  };

  return (
    <div className="reserva-container">
      <h2 className="mb-4 text-white text-center">Confirmación de Reserva</h2>
      <div className="text-start text-white mx-auto" style={{ maxWidth: '500px' }}>
        <p><strong>Servicio:</strong> {formulario.servicio}</p>
        <p><strong>Profesional:</strong> {formulario.profesional || 'No seleccionada'}</p>
        <p><strong>Fecha:</strong> {formulario.fecha}</p>
        <p><strong>Hora:</strong> {formulario.hora}</p>
        <p><strong>Nombre:</strong> {formulario.nombre} {formulario.apellido}</p>
        <p><strong>Correo:</strong> {formulario.correo}</p>
        <p><strong>Teléfono:</strong> {formulario.telefono}</p>
      </div>

      <div className="mt-4 d-flex justify-content-center gap-3">
        <button onClick={retrocederPaso} className="btn btn-outline-light">← Volver</button>
        <button onClick={manejarEnvio} className="btn btn-warning">Reservar</button>
      </div>

      {mostrarModal && (
        <div className="modal-reserva">
          <div className="modal-contenido animate__animated animate__fadeInDown">
            <h5 className="text-center mb-3">🎉 Reserva realizada con éxito</h5>
            <div className="text-white text-start">
              <p><strong>Servicio:</strong> {formulario.servicio}</p>
              <p><strong>Profesional:</strong> {formulario.profesional}</p>
              <p><strong>Fecha:</strong> {formulario.fecha}</p>
              <p><strong>Hora:</strong> {formulario.hora}</p>
              <p><strong>Nombre:</strong> {formulario.nombre} {formulario.apellido}</p>
              <p><strong>Correo:</strong> {formulario.correo}</p>
              <p><strong>Teléfono:</strong> {formulario.telefono}</p>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-outline-light" onClick={() => navigate('/')}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumenReserva;