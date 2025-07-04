// src/pages/QuienesSomos.jsx
import '../styles/quienesSomos.css';
import salonFrontal from '../assets/images/salon-frontal.png';

const QuienesSomos = () => {
  return (
    <div className="quienes-somos-page text-white py-5">
      <div className="container">
        {/* Título principal */}
        <h2 className="text-center mb-4 display-5 fw-bold">Salón de Belleza Sary Salgado</h2>

        <div className="row align-items-center mb-5">
          {/* Imagen del salón */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={salonFrontal}
              alt="Salón de Belleza"
              className="img-fluid rounded shadow"
            />
          </div>

          {/* Información de presentación */}
          <div className="col-md-6">
            <p className="lead">
              <strong>Salón de Belleza Sary Salgado</strong>, con presencia en las comunas de <strong>Cerrillos</strong> y <strong>Maipú</strong>, te ofrecemos una experiencia de belleza única. Contamos con un equipo de profesionales altamente capacitados en peluquería, manicure, depilación, cejas y pestañas.
            </p>
            <p className="lead">
              Bajo una dirección joven, apasionada e innovadora, nuestro compromiso es entregarte lo mejor en cada servicio. Agenda tu hora y déjate consentir por nuestras manos expertas.
            </p>
            <p className="lead">
              Ya sea para un evento especial, una cena o simplemente para sentirte renovada y radiante, estamos aquí para ti.
              <strong> Descubre tu belleza en el Salón de Sary Salgado.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuienesSomos;