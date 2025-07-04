// src/pages/Home.jsx
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Redirige al formulario de registro
  const irARegistro = () => {
    navigate('/registro');
  };

  return (
    <div className="app-bg">
      <div className="home-container container mt-5">
        <div className="row align-items-center">
          {/* Imagen destacada del salón */}
          <div className="col-md-6 text-center">
            <img
              src="/images/salon-frontal1.png"
              alt="Salón de Belleza Sary Salgado"
              className="img-fluid salon-img zoom-shadow"
            />
          </div>

          {/* Texto de bienvenida y botón de registro */}
          <div className="col-md-6 text-center text-md-start text-white">
            <h2 className="fw-bold text-center">BIENVENIDOS</h2>
            <p className="text-justify mt-3">
              Somos pioneras en ofrecer las mejores técnicas de belleza integral a domicilio en el sector poniente de Santiago.
              Con un equipo profesional que combina experiencia con calidad humana, brindamos servicios de peluquería,
              estilismo, uñas, depilación, pestañas y venta de cosméticos y perfumes.
            </p>

            <h5 className="fw-bold text-warning text-center mt-4">
              Somos tu Salón de Belleza a Domicilio
            </h5>
            <p className="text-center text-light">Maipú - Cerrillos - Padre Hurtado</p>

            <div className="text-center mt-4">
              <button className="btn btn-warning animated-btn" onClick={irARegistro}>
                Registrarse
              </button>
              <p className="fw-bold mt-3 text-light">
                Regístrate como cliente y obtén importantes beneficios y descuentos especiales
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;