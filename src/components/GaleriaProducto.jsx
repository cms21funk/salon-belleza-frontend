// src/components/GaleriaProducto.jsx
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/useAuth';
import DetalleProducto from './DetalleProducto';
import '../styles/Servicios.css';

const GaleriaProducto = ({ categoria, onCerrar }) => {
  const [productos, setProductos] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const { agregarAlCarrito } = useCart();
  const { usuario } = useAuth();
  const [likes, setLikes] = useState({});

  // Obtener productos por categoría
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/productos');
        const data = await response.json();
        const filtrados = data.filter((p) => p.categoria === categoria);
        setProductos(filtrados);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, [categoria]);

  // Registrar like del cliente
  const registrarLike = async (producto) => {
    if (!usuario || usuario.rol !== 'cliente') return;

    try {
      await fetch('http://localhost:3000/api/likes-productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: usuario.id,
          cliente_nombre: usuario.nombre,
          producto_id: producto.id,
          producto_nombre: producto.nombre,
          categoria: producto.categoria
        })
      });

      // Alternar like visualmente
      setLikes((prev) => ({
        ...prev,
        [producto.id]: prev[producto.id] === 1 ? 0 : 1
      }));
    } catch (error) {
      console.error('Error al registrar like:', error);
    }
  };

  // Mostrar vista detalle si se selecciona un producto
  if (detalle) {
    return (
      <DetalleProducto
        producto={detalle}
        onVolver={() => setDetalle(null)}
        likes={likes}
        toggleLike={registrarLike}
      />
    );
  }

  return (
    <div className="text-white py-5">
      <div className="container">
        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white">{categoria.replace(/_/g, ' ')}</h3>
          <button onClick={onCerrar} className="btn btn-outline-light">Cerrar</button>
        </div>

        {/* Galería de productos */}
        {productos.length === 0 ? (
          <p className="text-center">No hay productos en esta categoría.</p>
        ) : (
          <div className="row">
            {productos.map(producto => (
              <div key={producto.id} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 bg-black text-white shadow">
                  <img
                    src={`http://localhost:3000/images/${producto.imagen}`}
                    className="card-img-top"
                    alt={producto.nombre}
                    style={{ objectFit: 'cover', height: '320px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">${producto.precio.toLocaleString()}</p>

                    {/* Like disponible solo para clientes */}
                    {usuario?.rol === 'cliente' && (
                      <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => registrarLike(producto)}
                      >
                        ❤️ {likes[producto.id] || 0}
                      </div>
                    )}

                    {/* Acciones */}
                    <button className="btn btn-outline-warning me-2" onClick={() => setDetalle(producto)}>
                      Ver detalle
                    </button>
                    <button className="btn btn-warning" onClick={() => agregarAlCarrito(producto)}>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GaleriaProducto;