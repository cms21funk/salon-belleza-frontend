// src/admin/GestionComentarios.jsx 
import { useEffect, useState } from 'react';

const GestionComentarios = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [profesionalSeleccionada, setProfesionalSeleccionada] = useState(null);

  // Cargar comentarios desde la API al montar el componente
  useEffect(() => {
    const cargarComentarios = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/comentarios`);
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error al cargar comentarios:', error);
      }
    };
    cargarComentarios();
  }, []);

  // Agrupar comentarios por profesional
  const profesionales = Object.values(
    feedbacks.reduce((acc, fb) => {
      if (!acc[fb.staff_id]) {
        acc[fb.staff_id] = {
          staff_id: fb.staff_id,
          nombre: fb.staff_nombre,
          especialidad: fb.especialidad,
          imagen: fb.imagen,
          feedbacks: []
        };
      }
      acc[fb.staff_id].feedbacks.push(fb); // Mostrar aunque no tenga feedback_id
      return acc;
    }, {})
  );

  // Eliminar comentario por ID
  const eliminarComentario = async (id) => {
    const confirmar = window.confirm('¿Deseas eliminar este comentario?');
    if (confirmar) {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/${id}`, { method: 'DELETE' });
        setFeedbacks(prev => prev.filter(fb => fb.feedback_id !== id));
      } catch (error) {
        console.error('Error al eliminar comentario:', error);
      }
    }
  };

  // Simular envío de correo
  const enviarEmail = (email, mensaje) => {
    alert(`Email enviado a ${email}\n\nMensaje:\n${mensaje}`);
  };

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4">Gestión de Comentarios de Profesionales</h2>

      {/* Cards de profesionales */}
      {!profesionalSeleccionada && (
        <div className="row">
          {profesionales.map((pro) => (
            <div key={pro.staff_id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
              <div className="card bg-black text-white h-100">
                <img
                  src={pro.imagen ? pro.imagen : '/placeholder.jpg'}
                  className="card-img-top"
                  alt={pro.nombre}
                  style={{ height: '250px', objectFit: 'cover', borderRadius: '12px' }}
                />
                <div className="card-body p-2">
                  <h6 className="mb-1">{pro.nombre}</h6>
                  <small className="d-block mb-1">{pro.especialidad}</small>
                  <p className="mb-2">
                    👍 {pro.feedbacks.filter(f => f.like).length} | 👎 {pro.feedbacks.filter(f => f.dislike).length}
                  </p>
                  <button
                    className="btn btn-outline-warning w-100 btn-sm"
                    onClick={() => setProfesionalSeleccionada(pro)}
                  >
                    Ver comentarios
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detalle de comentarios */}
      {profesionalSeleccionada && (
        <div className="mt-5">
          <h4>Comentarios de {profesionalSeleccionada.nombre}</h4>
          <table className="table table-dark table-striped mt-3">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Comentario</th>
                <th>Fecha</th>
                <th>Like</th>
                <th>Dislike</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {profesionalSeleccionada.feedbacks.map((fb) => (
                <tr key={fb.feedback_id || fb.fecha}>
                  <td>{fb.cliente_nombre}</td>
                  <td>{fb.comentario}</td>
                  <td>{new Date(fb.fecha).toLocaleString()}</td>
                  <td>{fb.like ? '👍' : ''}</td>
                  <td>{fb.dislike ? '👎' : ''}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => eliminarComentario(fb.feedback_id)}
                      disabled={!fb.feedback_id}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => enviarEmail(fb.cliente_email, fb.comentario)}
                    >
                      Enviar Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-secondary mt-3" onClick={() => setProfesionalSeleccionada(null)}>
            ← Volver
          </button>
        </div>
      )}
    </div>
  );
};

export default GestionComentarios;