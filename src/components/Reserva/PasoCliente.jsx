import { useState } from 'react';
import '../../styles/PasoCliente.css';

const PasoCliente = ({ avanzarPaso, retrocederPaso, actualizarFormulario }) => {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: ''
  });

  const [mostrarModal, setMostrarModal] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => {
      const actualizado = { ...prev, [name]: value };
      actualizarFormulario(name, value);
      return actualizado;
    });
  };

  const manejarSiguiente = () => {
    const { nombre, apellido, correo, telefono } = cliente;
    if (!nombre || !apellido || !correo || !telefono) {
      setMostrarModal(true);
      return;
    }
    avanzarPaso();
  };

  return (
    <div className="paso-cliente-container">
      <h2 className="text-center mb-4 text-white">Tus datos</h2>

      <form className="formulario-paso-cliente">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nombre"
          name="nombre"
          value={cliente.nombre}
          onChange={manejarCambio}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Apellido"
          name="apellido"
          value={cliente.apellido}
          onChange={manejarCambio}
        />
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Correo electrónico"
          name="correo"
          value={cliente.correo}
          onChange={manejarCambio}
        />
        <input
          type="tel"
          className="form-control mb-3"
          placeholder="Teléfono"
          name="telefono"
          value={cliente.telefono}
          onChange={manejarCambio}
        />

        <div className="d-flex justify-content-center gap-3 mt-3">
          <button type="button" onClick={retrocederPaso} className="btn btn-outline-light">
            ← Volver
          </button>
          <button type="button" onClick={manejarSiguiente} className="btn btn-warning">
            Siguiente →
          </button>
        </div>
      </form>

      {/* Modal de advertencia */}
      {mostrarModal && (
        <div className="modal-registro">
          <div className="modal-contenido animate__animated animate__fadeInDown">
            <h5 className="text-center mb-3">⚠️ Campos incompletos</h5>
            <p className="text-center">Por favor completa todos los campos.</p>
            <div className="text-center">
              <button className="btn btn-outline-light" onClick={() => setMostrarModal(false)}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasoCliente;