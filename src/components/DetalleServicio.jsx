// src/components/DetalleServicio.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/useAuth';
import '../styles/Servicios.css';

const DetalleServicio = ({ servicio, onVolver, likes = {}, toggleLike }) => {
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCart();
  const { usuario } = useAuth();

  // Aumentar cantidad
  const aumentar = () => setCantidad(cantidad + 1);

  // Disminuir cantidad (mínimo 1)
  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  // Agregar servicio al carrito
  const manejarAgregar = () => {
    agregarAlCarrito(servicio, cantidad);
    onVolver();
  };

  // Registrar like del cliente al trabajo de la profesional
  const registrarLikeTrabajo = async () => {
    try {
      await fetch('http://localhost:3000/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: usuario.id,
          cliente_nombre: usuario.nombre,
          staff_id: servicio.staff_id,
          staff_nombre: servicio.nombre_profesional,
          servicio_id: servicio.id,
          servicio_nombre: servicio.tipo
        })
      });
    } catch (error) {
      console.error('Error al registrar like:', error);
    }

    toggleLike(servicio.id); // Actualizar contador de likes en pantalla
  };

  if (!servicio) return null;

  const id = servicio.id;
  const likesActuales = likes[id] || 0;

  return (
    <div className="detalle-servicio container py-5 text-white">
      <div className="row align-items-center">

        {/* Imagen del servicio */}
        <div className="col-md-6 text-center">
          <img
            src={`http://localhost:3000/images/${servicio.imagen}`}
            alt={servicio.tipo}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Detalles del servicio */}
        <div className="col-md-6">
          <h2 className="fw-bold">{servicio.tipo}</h2>
          <p className="mt-3">{servicio.detalle}</p>
          <h4 className="text-warning mt-3">${servicio.precio.toLocaleString()}</h4>

          {/* Nombre de la profesional */}
          <p className="fw-bold text-white mt-2">
            👩‍🎨 Profesional: {servicio.nombre_profesional}
          </p>

          {/* Like visible solo para clientes */}
          {usuario?.rol === 'cliente' && (
            <div
              className="mt-2 mb-3 d-flex align-items-center gap-3"
              style={{ cursor: 'pointer' }}
              onClick={registrarLikeTrabajo}
            >
              ❤️ <span>{likesActuales}</span>
            </div>
          )}

          {/* Selector de cantidad */}
          <div className="mt-3 d-flex gap-3 align-items-center">
            <label className="me-2">Cantidad:</label>
            <button className="btn btn-outline-light" onClick={disminuir}>-</button>
            <span>{cantidad}</span>
            <button className="btn btn-outline-light" onClick={aumentar}>+</button>
          </div>

          {/* Acciones */}
          <div className="mt-4 d-flex gap-3">
            <button className="btn btn-warning" onClick={manejarAgregar}>
              Agregar al carrito
            </button>
            <button className="btn btn-outline-light" onClick={onVolver}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleServicio;