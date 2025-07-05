// src/components/DetalleProducto.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/useAuth';

const DetalleProducto = ({ producto, onVolver, likes = {}, toggleLike = () => {} }) => {
  const { agregarAlCarrito } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const { usuario } = useAuth();

  // Aumentar cantidad
  const incrementar = () => setCantidad(prev => prev + 1);

  // Disminuir cantidad (mínimo 1)
  const decrementar = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  // Agregar al carrito
  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    alert(`Agregado al carrito: ${producto.nombre} x${cantidad}`);
  };

  return (
    <div className="container text-white py-5">
      <div className="row align-items-center">
        {/* Imagen del producto */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={`/images/${producto.imagen}`} 
            alt={`Imagen de ${producto.nombre}`}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <h2 className="fw-bold">{producto.nombre}</h2>
          <p className="lead">{producto.detalle}</p>
          <h4 className="text-warning fw-bold mb-3">
            ${producto.precio.toLocaleString()}
          </h4>

          {/* Like solo para clientes */}
          {usuario?.rol === 'cliente' && (
            <div className="mb-3" style={{ cursor: 'pointer' }} onClick={() => toggleLike(producto)}>
              ❤️ {likes[producto.id] || 0}
            </div>
          )}

          {/* Contador de cantidad */}
          <div className="d-flex align-items-center mb-3">
            <button onClick={decrementar} className="btn btn-outline-danger btn-sm me-2">−</button>
            <span className="fs-4">{cantidad}</span>
            <button onClick={incrementar} className="btn btn-outline-success btn-sm ms-2">+</button>
          </div>

          {/* Acciones */}
          <div className="d-flex gap-3 mt-3">
            <button onClick={handleAgregar} className="btn btn-warning">
              Agregar al carrito
            </button>
            <button onClick={onVolver} className="btn btn-outline-light">
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;