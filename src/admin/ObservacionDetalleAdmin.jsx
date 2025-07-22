import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import '../styles/ObservacionDetalleAdmin.css';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ObservacionDetalleAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const [profesional, setProfesional] = useState(null);
  const [observaciones, setObservaciones] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res1 = await fetch(`${BASE_URL}/api/usuarios`);
        const usuarios = await res1.json();
        const profe = usuarios.find(u => u.id === parseInt(id));
        setProfesional(profe);

        const res2 = await fetch(`${BASE_URL}/api/observaciones/${id}`);
        const data = await res2.json();
        setObservaciones(data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, [id]);

  const enviarComentario = async () => {
    if (!mensaje.trim()) return;

    try {
      if (editandoId) {
        await fetch(`${BASE_URL}/api/observaciones/editar/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mensaje }),
        });
      } else {
        await fetch(`${BASE_URL}/api/observaciones`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            staff_id: parseInt(id),
            admin_id: usuario.id,
            mensaje,
          }),
        });
      }

      setMensaje('');
      setEditandoId(null);

      const res = await fetch(`${BASE_URL}/api/observaciones/${id}`);
      const data = await res.json();
      setObservaciones(data);
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };

  const borrarComentario = async (comentarioId) => {
    try {
      await fetch(`${BASE_URL}/api/observaciones/${comentarioId}`, {
        method: 'DELETE',
      });
      setObservaciones(obs => obs.filter(o => o.id !== comentarioId));
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    }
  };

  const prepararEdicion = (comentario) => {
    setMensaje(comentario.mensaje);
    setEditandoId(comentario.id);
  };

  if (!profesional) return <p className="text-white">Cargando...</p>;

  // ✅ Corrección: definir la ruta completa de imagen correctamente
  const urlImagen = profesional.imagen?.startsWith('http')
    ? profesional.imagen
    : `${BASE_URL}/images/${profesional.imagen}`;

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4 text-center">Observaciones para {profesional.nombre}</h2>
      <div className="d-flex justify-content-center mb-4">
        <div className="card-staff text-white text-center">
          <img
            src={urlImagen}
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

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
          ← Volver
        </button>
      </div>
    </div>
  );
};

export default ObservacionDetalleAdmin;