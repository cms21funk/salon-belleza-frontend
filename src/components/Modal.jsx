// src/components/Modal.jsx
import React from 'react';
import '../styles/Modal.css';

const Modal = ({ contenido, cerrar }) => {
  return (
    <div className="modal-overlay" onClick={cerrar}>
      <div className="modal-contenido animated fadeInUp" onClick={(e) => e.stopPropagation()}>
        <div dangerouslySetInnerHTML={{ __html: contenido }} />
        <button className="btn btn-warning mt-4 fw-bold" onClick={cerrar}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default Modal;