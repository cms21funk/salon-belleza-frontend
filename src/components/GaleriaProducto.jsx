import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/useAuth';
import DetalleProducto from './DetalleProducto';
import '../styles/Servicios.css';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const GaleriaProducto = ({ categoria, onCerrar }) => {
  const [productos, setProductos] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const { agregarAlCarrito } = useCart();
  const { usuario } = useAuth();
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/productos`);
        const data = await res.json();
        const filtrados = data.filter(
          (p) => normalize(p.categoria) === normalize(categoria)
        );
        setProductos(filtrados);
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    };
    obtenerProductos();
  }, [categoria]);

  const registrarLike = async (prod) => {
    if (!usuario || usuario.rol !== 'cliente') return;
    try {
      await fetch(`${API_BASE}/api/likes-productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: usuario.id,
          cliente_nombre: usuario.nombre,
          producto_id: prod.id,
          producto_nombre: prod.nombre,
          categoria: prod.categoria
        })
      });
      setLikes((prev) => ({
        ...prev,
        [prod.id]: prev[prod.id] === 1 ? 0 : 1
      }));
    } catch (err) {
      console.error('Error al registrar like:', err);
    }
  };

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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white">{categoria}</h3>
          <button onClick={onCerrar} className="btn btn-outline-light">
            Cerrar
          </button>
        </div>

        {productos.length === 0 ? (
          <p className="text-center">No hay productos en esta categoría.</p>
        ) : (
          <div className="row">
            {productos.map((prod) => (
              <div key={prod.id} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 bg-black text-white shadow">
                  <img
                    src={`${API_BASE}/images/${prod.imagen}`}
                    className="card-img-top"
                    alt={prod.nombre}
                    style={{ objectFit: 'cover', height: '320px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{prod.nombre}</h5>
                    <p className="card-text">
                      ${prod.precio.toLocaleString()}
                    </p>

                    {usuario?.rol === 'cliente' && (
                      <div
                        className="mb-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => registrarLike(prod)}
                      >
                        ❤️ {likes[prod.id] || 0}
                      </div>
                    )}

                    <button
                      className="btn btn-outline-warning me-2"
                      onClick={() => setDetalle(prod)}
                    >
                      Ver detalle
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => agregarAlCarrito(prod)}
                    >
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