import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../auth/useAuth';
import '../styles/MisMensajes.css';

const MisMensajes = () => {
  const { usuario } = useAuth();
  const [observaciones, setObservaciones] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [likesPorTrabajo, setLikesPorTrabajo] = useState([]);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://salon-belleza-backend.onrender.com';

  // Cargar datos desde el backend
  const cargarDatos = useCallback(async () => {
    try {
      const [obsRes, feedRes, likesRes] = await Promise.all([
        fetch(`${BASE_URL}/api/observaciones/${usuario.id}`),
        fetch(`${BASE_URL}/api/feedback/staff/${usuario.id}`),
        fetch(`${BASE_URL}/api/likes/staff/${usuario.id}`)
      ]);

      const obsData = await obsRes.json();
      const feedData = await feedRes.json();
      const likesData = await likesRes.json();

      setObservaciones(obsData);
      setFeedback(feedData);
      setLikesPorTrabajo(likesData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }, [usuario.id]);

  const marcarComoLeido = async (id) => {
    try {
      await fetch(`${BASE_URL}/api/observaciones/leido/${id}`, {
        method: 'PUT'
      });
      cargarDatos(); // Recargar tras marcar como leído
    } catch (error) {
      console.error('Error al marcar como leído', error);
    }
  };

  useEffect(() => {
    if (usuario?.rol === 'staff') {
      cargarDatos();
    }
  }, [usuario, cargarDatos]);

  const totalLikes = feedback.filter(f => f.like).length;
  const totalDislikes = feedback.filter(f => f.dislike).length;
  const promedioEstrellas = feedback.length
    ? (feedback.reduce((acc, curr) => acc + curr.estrellas, 0) / feedback.length).toFixed(1)
    : 0;

  return (
    <div className="container text-white py-5">
      <h2 className="text-center mb-5">Mis Mensajes</h2>

      <div className="perfil-contenedor">
        <div className="perfil-info">
          <h3>{usuario.nombre}</h3>
          <p><strong>Especialidad:</strong> {usuario.especialidad}</p>

          <h4 className="mt-3"><strong>Mi Desempeño:</strong></h4>
          <ul>
            <li>⭐ Promedio de estrellas: <strong>{promedioEstrellas}</strong></li>
            <li>👍 Likes: <strong>{totalLikes}</strong></li>
            <li>👎 Dislikes: <strong>{totalDislikes}</strong></li>
          </ul>

          <h5 className="mt-3">❤️ Likes recibidos por trabajos:</h5>
          <ul>
            {likesPorTrabajo.map((like) => (
              <li key={like.tipo}>
                {like.tipo}: ❤️ {like.total_likes}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <img
            src={usuario.imagen || '/default-profile.png'}
            alt="Perfil"
            className="perfil-foto"
          />
        </div>
      </div>

      <h4 className="mt-5">Historial de mensajes:</h4>
      <table className="table table-dark table-hover mt-3">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Mensaje</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {observaciones.map((obs) => (
            <tr key={obs.id}>
              <td>{new Date(obs.fecha).toLocaleString()}</td>
              <td>{obs.mensaje}</td>
              <td>
                {obs.estado === 'Leído' ? (
                  <span className="check-btn checked">✅ Leído</span>
                ) : (
                  <button
                    className="check-btn"
                    onClick={() => marcarComoLeido(obs.id)}
                    title="Marcar como leído"
                  >
                    ⬜ No leído
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MisMensajes;