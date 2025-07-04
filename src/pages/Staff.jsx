// src/pages/Staff.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/useAuth';
import '../styles/global.css';
import '../styles/staff.css';

const Staff = () => {
  const { usuario } = useAuth(); // Usuario autenticado
  const [profesionales, setProfesionales] = useState([]);
  const [comentarios, setComentarios] = useState({});
  const [calificaciones, setCalificaciones] = useState({});
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});

  // Obtener lista de profesionales con rol 'staff'
  useEffect(() => {
    const obtenerStaff = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/profesionales');
        const data = await res.json();

        const filtrados = data
          .filter(pro => pro.rol === 'staff')
          .map(pro => ({
            id: pro.id,
            nombre: pro.nombre,
            especialidad: pro.especialidad,
            imagen: `http://localhost:3000/images/${pro.imagen}`
          }));

        setProfesionales(filtrados);
      } catch (error) {
        console.error('Error al obtener staff:', error);
      }
    };

    obtenerStaff();
  }, []);

  // Alternar like
  const manejarLike = (id) => {
    if (usuario?.rol === 'cliente') {
      setLikes(prev => ({ ...prev, [id]: !prev[id] }));
      if (dislikes[id]) setDislikes(prev => ({ ...prev, [id]: false }));
    }
  };

  // Alternar dislike
  const manejarDislike = (id) => {
    if (usuario?.rol === 'cliente') {
      setDislikes(prev => ({ ...prev, [id]: !prev[id] }));
      if (likes[id]) setLikes(prev => ({ ...prev, [id]: false }));
    }
  };

  // Manejar texto del comentario
  const manejarComentario = (id, value) => {
    setComentarios(prev => ({ ...prev, [id]: value }));
  };

  // Manejar selección de estrellas
  const manejarEstrellas = (id, valor) => {
    setCalificaciones(prev => ({ ...prev, [id]: valor }));
  };

  // Enviar comentario al backend
  const enviarComentario = async (staff_id) => {
    const comentario = comentarios[staff_id] || '';
    const estrellas = calificaciones[staff_id] || 0;
    const like = likes[staff_id] || false;
    const dislike = dislikes[staff_id] || false;

    if (comentario.length <= 300 && estrellas > 0) {
      try {
        const body = {
          cliente_id: usuario.id,
          staff_id,
          comentario,
          estrellas,
          like,
          dislike
        };

        const res = await fetch('http://localhost:3000/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        const data = await res.json();

        if (res.ok) {
          alert('¡Gracias por tu comentario!');
          setComentarios(prev => ({ ...prev, [staff_id]: '' }));
          setCalificaciones(prev => ({ ...prev, [staff_id]: 0 }));
        } else {
          alert('Error al enviar comentario: ' + data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de red al enviar comentario');
      }
    }
  };

  return (
    <div className="staff-container">
      <h2 className="staff-title">SALÓN DE BELLEZA SARY SALGADO</h2>
      <p className="staff-subtitle">Conoce a nuestro Staff</p>

      <div className="staff-grid">
        {profesionales.map(pro => (
          <div key={pro.id} className="staff-card">
            <img src={pro.imagen} alt={pro.nombre} />
            <p className="staff-name">{pro.nombre}</p>
            <p className="staff-role">Staff {pro.especialidad}</p>

            <div className="feedback-buttons">
              <button
                className={`btn btn-sm ${likes[pro.id] ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => manejarLike(pro.id)}
                disabled={usuario?.rol !== 'cliente'}
              >
                👍
              </button>
              <button
                className={`btn btn-sm ${dislikes[pro.id] ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => manejarDislike(pro.id)}
                disabled={usuario?.rol !== 'cliente'}
              >
                👎
              </button>
            </div>

            <textarea
              className="form-control mt-3"
              placeholder="Tu experiencia (máx 300 caracteres)"
              maxLength={300}
              value={comentarios[pro.id] || ''}
              onChange={(e) => manejarComentario(pro.id, e.target.value)}
              disabled={usuario?.rol !== 'cliente'}
            ></textarea>

            <div className="stars mt-2">
              {[1, 2, 3, 4, 5].map(estrella => (
                <span
                  key={estrella}
                  style={{
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    color: estrella <= (calificaciones[pro.id] || 0) ? 'gold' : 'gray'
                  }}
                  onClick={() =>
                    usuario?.rol === 'cliente' && manejarEstrellas(pro.id, estrella)
                  }
                >
                  ★
                </span>
              ))}
            </div>

            <button
              className="btn btn-warning mt-3"
              onClick={() => enviarComentario(pro.id)}
              disabled={
                !comentarios[pro.id] ||
                (calificaciones[pro.id] || 0) === 0 ||
                usuario?.rol !== 'cliente'
              }
            >
              Enviar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;