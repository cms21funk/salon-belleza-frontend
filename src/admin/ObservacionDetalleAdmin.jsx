// src/admin/ObservacionDetalleAdmin.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import '../styles/ObservacionDetalleAdmin.css';

const ObservacionDetalleAdmin = () => {
  // Obtener ID del profesional desde la URL
  const { id } = useParams();
  const navigate = useNavigate();

  // Obtener usuario logueado (admin)
  const { usuario } = useAuth();

  // Estados
  const [profesional, setProfesional] = useState(null);
  const [observaciones, setObservaciones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // Cargar datos al iniciar componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Obtener datos del profesional
        const res1 = await fetch(`http://localhost:3000/api/usuarios`);
        const usuarios = await res1.json();
        const profe = usuarios.find(u => u.id === parseInt(id));
        setProfesional(profe);

        // Obtener observaciones asociadas
        const res2 = await fetch(`http://localhost:3000/api/observaciones/${id}`);
        const data = await res2.json();
        setObservaciones(data);
      } catch (error) {
        console.error('Error al cargar datos del profesional u observaciones:', error);
      }
    };

    cargarDatos();
  }, [id]);

  // Crear o actualizar observación
  const enviarComentario = async () => {
    if (!mensaje.trim()) return;

    try {
      if (editandoId) {
        // Actualizar observación existente
        await fetch(`http://localhost:3000/api/observaciones/editar/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mensaje }),
        });
      } else {
        // Crear nueva observación
        await fetch('http://localhost:3000/api/observaciones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            staff_id: parseInt(id),
            admin_id: usuario.id,
            mensaje,
          }),
        });
      }

      // Limpiar formulario y recargar observaciones
      setMensaje('');
      setEditandoId(null);

      const res = await fetch(`http://localhost:3000/api/observaciones/${id}`);
      const data = await res.json();
      setObservaciones(data);
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };

  // Eliminar observación
  const borrarComentario = async (comentarioId) => {
    try {
      await fetch(`http://localhost:3000/api/observaciones/${comentarioId}`, {
        method: 'DELETE',
      });

      // Filtrar observación eliminada del estado
      setObservaciones(obs => obs.filter(o => o.id !== comentarioId));
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    }
  };

  // Preparar observación para edición
  const prepararEdicion = (comentario) => {
    setMensaje(comentario.mensaje);
    setEditandoId(comentario.id);
  };

  // Si no está listo el profesional, mostrar cargando
  if (!profesional) return <p className="text-white">Cargando...</p>;

  return (
    <div className="container py-5 text-white">
      {/* 🔹 Cabecera */}
      <h2 className="mb-4 text-center">Observaciones para {profesional.nombre}</h2>

      {/* Tarjeta del profesional */}
      <div className="d-flex justify-content-center mb-4">
        <div className="card-staff text-white text-center">
          <img
            src={`http://localhost:3000/images/${profesional.imagen}`}
            className="card-img-top"
            alt={profesional.nombre}
            style={{ height: '200px', objectFit: 'cover', borderRadius: '12px' }}
          />
          <div>
            <h4 className="fw-bold mt-3">{profesional.nombre}</h4>
            <p>{profesional.especialidad}</p>
          </div>
        </div>
      </div>

      {/* Formulario de observación */}
      <h5 className="text-warning text-center">Deja una nueva observación</h5>
      <textarea
        className="form-control mb-3"
        maxLength={300}
        rows={3}
        value={mensaje}
        onChange={e => setMensaje(e.target.value)}
        placeholder="Escribe tu comentario (máx 300 caracteres)"
      />
      <div className="text-center mb-5">
        <button className="btn btn-warning px-4" onClick={enviarComentario}>
          {editandoId ? 'Guardar cambios' : 'Enviar'}
        </button>
      </div>

      {/* Tabla de observaciones */}
      <div className="table-responsive">
        <table className="table custom-table table-striped table-dark">
          <thead className="text-center">
            <tr>
              <th>Fecha</th>
              <th>Mensaje</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {observaciones.map(obs => (
              <tr key={obs.id}>
                <td>{new Date(obs.fecha).toLocaleString()}</td>
                <td>{obs.mensaje}</td>
                <td>
                  <span className={`badge ${obs.estado === 'Leído' ? 'bg-success' : 'bg-danger'}`}>
                    {obs.estado}
                  </span>
                </td>
                <td className="text-center">
                  <button className="btn btn-sm btn-warning me-2" onClick={() => prepararEdicion(obs)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => borrarComentario(obs.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón volver */}
      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default ObservacionDetalleAdmin;