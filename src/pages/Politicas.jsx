// src/pages/Politicas.jsx
import { useState } from 'react';
import '../styles/Politicas.css';
import confianzaImage from '../assets/images/confianza-generada.png';

// Preguntas frecuentes (FAQ) con sus respectivas respuestas
const preguntas = [
  {
    pregunta: '¿Puedo atenderme sin hora agendada?',
    respuesta:
      'Recomendamos agendar con anticipación para asegurar tu espacio. Si llegas sin cita, haremos lo posible por atenderte según la disponibilidad del salón. Las citas agendadas siempre tendrán prioridad.',
  },
  {
    pregunta: '¿Qué pasa si me atraso a mi hora?',
    respuesta:
      'Avísanos lo antes posible. Podremos reorganizar la agenda y, si es necesario, reagendar tu cita. Tu comunicación nos permite atenderte de forma adecuada.',
  },
  {
    pregunta: '¿Qué pasa si necesito cancelar mi hora?',
    respuesta:
      'Puedes cancelar o reagendar escribiéndonos por WhatsApp o Instagram. Agradecemos que nos informes con anticipación para liberar el espacio de la profesional y dar oportunidad a otras personas.',
  },
  {
    pregunta: 'No estoy satisfecho con el servicio',
    respuesta:
      'Todos nuestros servicios tienen una semana de garantía. Si algo no cumplió tus expectativas, háznoslo saber directamente a la profesional o encargada del salón para que podamos ofrecer una solución.',
  },
  {
    pregunta: '¿Te diste cuenta que no te gustó el servicio después?',
    respuesta:
      'Contáctanos por nuestras redes sociales dentro de los 7 días posteriores al servicio. Envíanos una foto y detállanos el problema para poder ayudarte con un retoque u otra solución.',
  },
];

const Politicas = () => {
  const [activoIndex, setActivoIndex] = useState(null); // Estado para expandir/cerrar cada pregunta

  // Alterna la visibilidad de la respuesta según índice
  const togglePregunta = (index) => {
    setActivoIndex(activoIndex === index ? null : index);
  };

  return (
    <div className="container text-white py-5">
      {/* Encabezado de la sección */}
      <h2 className="text-center mb-4">Nuestras Políticas</h2>
      <p className="lead text-center">
        En Salón de Belleza Sary Salgado priorizamos la excelencia y el bienestar de nuestros clientes.
        Buscamos que cada visita sea una experiencia única, cercana y transformadora.
        Nuestro compromiso es ofrecer un servicio integral que invite a volver siempre con la misma confianza.
      </p>

      {/* Imagen central */}
      <div className="text-center my-5">
        <img
          src={confianzaImage}
          alt="Confianza Calidad Servicio"
          className="img-fluid politicas-image"
          style={{ maxHeight: '300px' }}
        />
      </div>

      {/* Sección de preguntas frecuentes */}
      <div className="faq-section">
        {preguntas.map((item, index) => (
          <div className="faq-item" key={index}>
            <button
              className={`faq-question ${activoIndex === index ? 'active' : ''}`}
              onClick={() => togglePregunta(index)}
            >
              {item.pregunta}
              <span className="icon">{activoIndex === index ? '▲' : '▼'}</span>
            </button>

            {/* Muestra la respuesta solo si está activa */}
            {activoIndex === index && (
              <div className="faq-answer">{item.respuesta}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Politicas;