import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/useAuth';
import '../styles/Servicios.css';

const DetalleServicio = ({ servicio, onVolver, likes = {}, toggleLike }) => {
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCart();
  const { usuario } = useAuth();

  const API_BASE = 'https://salon-belleza-backend.onrender.com';

  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => { if (cantidad > 1) setCantidad(cantidad - 1); };

  const manejarAgregar = () => {
    agregarAlCarrito(servicio, cantidad);
    onVolver();
  };

  const registrarLikeTrabajo = async () => {
    try {
      await fetch(`${API_BASE}/api/likes`, {
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

    toggleLike(servicio.id);
  };

  if (!servicio) return null;

  const id = servicio.id;
  const likesActuales = likes[id] || 0;

  return (
    <div className="detalle-servicio container py-5 text-white">
      <div className="row align-items-center">
        {/* Imagen del servicio */}
        <div className="col-md-6 text-center">
          {servicio.imagen && (
            <img
              src={servicio.imagen} // ✅ AHORA la URL es directa desde Cloudinary
              alt={servicio.tipo}
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          )}
        </div>

        {/* Detalles del servicio */}
        <div className="col-md-6">
          <h2 className="fw-bold">{servicio.tipo}</h2>
          <p className="mt-3">{servicio.detalle}</p>
          <h4 className="text-warning mt-3">${servicio.precio.toLocaleString()}</h4>

          <p className="fw-bold text-white mt-2">
            👩‍🎨 Profesional: {servicio.nombre_profesional}
          </p>

          {usuario?.rol === 'cliente' && (
            <div
              className="mt-2 mb-3 d-flex align-items-center gap-3"
              style={{ cursor: 'pointer' }}
              onClick={registrarLikeTrabajo}
            >
              ❤️ <span>{likesActuales}</span>
            </div>
          )}

          <div className="mt-3 d-flex gap-3 align-items-center">
            <label className="me-2">Cantidad:</label>
            <button className="btn btn-outline-light" onClick={disminuir}>-</button>
            <span>{cantidad}</span>
            <button className="btn btn-outline-light" onClick={aumentar}>+</button>
          </div>

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