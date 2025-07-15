import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/useAuth';
import DetalleServicio from './DetalleServicio';
import '../styles/Servicios.css';

const GaleriaServicio = ({ servicio, onCerrar }) => {
  const [servicios, setServicios] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const { agregarAlCarrito } = useCart();
  const { usuario } = useAuth();
  const [likes, setLikes] = useState({});

  const API_BASE = 'https://salon-belleza-backend.onrender.com';

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/servicios`);
        const data = await res.json();

        // ✅ Normalizar incluyendo ñ
        const normalizar = (texto) =>
          texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ñ/g, "n")
            .replace(/Ñ/g, "N")
            .toLowerCase();

        const filtrados = data.filter(
          s => normalizar(s.servicio) === normalizar(servicio.id)
        );
        setServicios(filtrados);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      }
    };
    cargarServicios();
  }, [servicio.id]);

  const toggleLike = async (serv) => {
    if (!usuario || usuario.rol !== 'cliente') return;

    try {
      await fetch(`${API_BASE}/api/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: usuario.id,
          cliente_nombre: usuario.nombre,
          staff_id: serv.staff_id,
          staff_nombre: serv.nombre_profesional,
          servicio_id: serv.id,
          servicio_nombre: serv.tipo
        })
      });

      setLikes(prev => ({
        ...prev,
        [serv.id]: prev[serv.id] === 1 ? 0 : 1
      }));
    } catch (error) {
      console.error('Error al registrar like en galería:', error);
    }
  };

  if (!servicios.length) {
    return (
      <div className="text-center text-white py-5">
        <h4>No hay servicios disponibles en esta categoría.</h4>
        <button className="btn btn-outline-light mt-3" onClick={onCerrar}>
          Volver
        </button>
      </div>
    );
  }

  if (detalle) {
    return (
      <DetalleServicio
        servicio={detalle}
        onVolver={() => setDetalle(null)}
        likes={likes}
        toggleLike={(id) =>
          setLikes(prev => ({
            ...prev,
            [id]: prev[id] === 1 ? 0 : 1
          }))
        }
      />
    );
  }

  return (
    <div className="text-white py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white">Servicios disponibles</h3>
          <button onClick={onCerrar} className="btn btn-outline-light">Cerrar</button>
        </div>

        <div className="row">
          {servicios.map(serv => (
            <div key={serv.id} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 bg-black text-white shadow">
                <img
                  src={serv.imagen}
                  className="card-img-top"
                  alt={serv.tipo}
                />
                <div className="card-body">
                  <h5 className="card-title">{serv.tipo}</h5>
                  <p className="card-text">${serv.precio.toLocaleString()}</p>
                  <p className="fw-bold text-white">👩‍🎨 {serv.nombre_profesional}</p>

                  {usuario?.rol === 'cliente' && (
                    <div
                      className="mb-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleLike(serv)}
                    >
                      ❤️ {likes[serv.id] || 0}
                    </div>
                  )}

                  <button
                    className="btn btn-outline-warning me-2" onClick={() => setDetalle(serv)}>
                    Ver detalle
                  </button>
                  <button
                    className="btn btn-warning" onClick={() => agregarAlCarrito(serv)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GaleriaServicio;