import { useEffect, useState } from 'react';

// ⚠️ Asegúrate de reemplazar esta URL con tu URL real de Render
const URL_BACKEND = 'https://salon-belleza-backend.onrender.com';

const PasoProfesional = ({ avanzarPaso, retrocederPaso, actualizarFormulario, servicio }) => {
  const [profesionales, setProfesionales] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resProfesionales = await fetch(`${URL_BACKEND}/api/profesionales`);
        const profesionalesData = await resProfesionales.json();

        const resLikes = await fetch(`${URL_BACKEND}/api/feedback/likes`);
        const likesData = await resLikes.json();

        const likesMap = {};
        likesData.forEach(item => {
          likesMap[item.staff_id] = item.total_likes;
        });

        setLikes(likesMap);
        setProfesionales(profesionalesData);
      } catch (error) {
        console.error('Error al cargar profesionales:', error);
      }
    };

    obtenerDatos();
  }, []);

  const profesionalesFiltradas = profesionales.filter(
    (p) => p.especialidad === servicio
  );

  const seleccionar = (profesional) => {
    console.log('Profesional seleccionada:', profesional);
    actualizarFormulario('profesional', profesional.nombre);
    actualizarFormulario('profesional_id', profesional.id);
    avanzarPaso();
  };

  return (
    <div className="text-center text-white">
      <h2 className="mb-3">Selecciona una profesional</h2>
      <div className="row justify-content-center">
        {profesionalesFiltradas.map((pro) => (
          <div key={pro.id} className="col-6 col-md-4 col-lg-3 mb-4">
            <div className="card bg-black text-white">
              <img
                src={pro.imagen} {/* ← CORREGIDO: usar URL directa */}
                alt={pro.nombre}
                className="card-img-top"
                style={{ height: '350px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div className="card-body">
                <h5 className="card-title">{pro.nombre}</h5>
                <p className="card-text">{pro.especialidad}</p>
                <p className="card-text">👍 {likes[pro.id] || 0} Likes</p>
                <button
                  className="btn btn-warning w-100 mt-2"
                  onClick={() => seleccionar(pro)}
                >
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={retrocederPaso} className="btn btn-secondary mt-3">
        ← Volver
      </button>
    </div>
  );
};

export default PasoProfesional;