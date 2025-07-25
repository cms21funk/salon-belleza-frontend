// src/pages/Carrito.jsx 
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import '../styles/global.css';
import '../styles/Login.css'; // reutilizamos estilos elegantes del login
import Modal from '../components/Modal'; // usa el mismo modal animado

const Carrito = () => {
  const { carrito, totalMonto, actualizarCantidad, removerDelCarrito, vaciarCarrito } = useCart();

  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    celular: ''
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContenido, setModalContenido] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.apellido || !formulario.email || !formulario.celular) {
      setModalContenido('<strong>⚠️ Por favor completa todos los campos.</strong>');
      setModalVisible(true);
      return;
    }

    try {
      const res = await fetch('https://salon-belleza-backend.onrender.com/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formulario,
          carrito,
          total: totalMonto
        }),
      });

      const data = await res.json();

      if (res.ok) {
         setFormulario({ nombre: '', apellido: '', email: '', celular: '' }); // Limpia el formulario
         vaciarCarrito(); // Limpia el carrito visual y lógico

        setModalContenido(`
        <strong>✅ Consulta enviada exitosamente.</strong>
        <p><strong>Nombre:</strong> ${formulario.nombre} ${formulario.apellido}</p>
        <p><strong>Email:</strong> ${formulario.email}</p>
        <p><strong>Celular:</strong> ${formulario.celular}</p>
        <p><strong>Total:</strong> $${totalMonto.toLocaleString()}</p>
      `);
      } else {
        setModalContenido(`<strong>❌ Error al enviar la consulta:</strong> ${data.error}`);
      }
    } catch (error) {
      console.error("Error al enviar la consulta:", error);
      setModalContenido('<strong>❌ Ocurrió un error al enviar el formulario.</strong>');
    } finally {
      setModalVisible(true);
    }
  };

  return (
    <div className="app-bg">
      <div className="container py-5 text-white">
        <h2 className="text-center mb-4">Detalle del Pedido</h2>

        {carrito.length === 0 ? (
          <p className="text-center">Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="list-group mb-4">
              {carrito.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white border border-warning">
                  <div className="d-flex align-items-center">
                    <img
                    src={
                    item.imagen?.startsWith('http')
                    ? item.imagen
                    : `https://salon-belleza-backend.onrender.com/images/${item.imagen}`
                    }
                    alt={item.nombre}
                    width="60"
                    height="60"
                    className="me-3 rounded"
                    />
                    <div>
                      <strong>{item.nombre}</strong><br />
                      <small>${item.precio.toLocaleString()} x {item.cantidad}</small>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => actualizarCantidad(item.id, item.cantidad - 1)} className="btn btn-sm btn-danger me-2">-</button>
                    <button onClick={() => actualizarCantidad(item.id, item.cantidad + 1)} className="btn btn-sm btn-success me-2">+</button>
                    <button onClick={() => removerDelCarrito(item.id)} className="btn btn-sm btn-outline-light">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="display-5 text-warning fw-bold mb-4 text-center">
              Total: ${totalMonto.toLocaleString()}
            </h3>

            <div className="form-wrapper mx-auto p-4 rounded" style={{ maxWidth: '500px', backgroundColor: '#111', boxShadow: '0 0 15px 3px gold' }}>
              <h4 className="text-center mb-4 text-white">Datos de Contacto</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control input-dark"
                    placeholder="Nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="apellido"
                    className="form-control input-dark"
                    placeholder="Apellido"
                    value={formulario.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control input-dark"
                    placeholder="Email"
                    value={formulario.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    name="celular"
                    className="form-control input-dark"
                    placeholder="Celular"
                    value={formulario.celular}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-warning px-5 fw-bold">
                    Enviar consulta
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* Modal reutilizable */}
        {modalVisible && <Modal contenido={modalContenido} cerrar={() => setModalVisible(false)} />}
      </div>
    </div>
  );
};

export default Carrito;