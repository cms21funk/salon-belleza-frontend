// src/pages/Reserva.jsx
import { useState } from 'react';
import PasoServicio from '../components/Reserva/PasoServicio';
import PasoProfesional from '../components/Reserva/PasoProfesional';
import PasoFecha from '../components/Reserva/PasoFecha';
import PasoHora from '../components/Reserva/PasoHora';
import PasoCliente from '../components/Reserva/PasoCliente';
import ResumenReserva from '../components/Reserva/ResumenReserva';

const Reserva = () => {
  // Paso actual del formulario
  const [paso, setPaso] = useState(1);

  // Estado del formulario de reserva
  const [formulario, setFormulario] = useState({
    servicio: '',
    profesional: '',
    profesional_id: '',
    fecha: '',
    hora: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: ''
  });

  // Avanza al siguiente paso
  const avanzarPaso = () => setPaso(paso + 1);

  // Retrocede al paso anterior
  const retrocederPaso = () => setPaso(paso - 1);

  // Actualiza un campo del formulario
  const actualizarFormulario = (campo, valor) => {
    setFormulario(prev => ({ ...prev, [campo]: valor }));
    console.log(`Campo actualizado: ${campo} = ${valor}`);
  };

  return (
    <div className="container py-5">
      {paso === 1 && (
        <PasoServicio
          avanzarPaso={avanzarPaso}
          actualizarFormulario={actualizarFormulario}
        />
      )}

      {paso === 2 && (
        <PasoProfesional
          servicio={formulario.servicio}
          avanzarPaso={avanzarPaso}
          retrocederPaso={retrocederPaso}
          actualizarFormulario={actualizarFormulario}
        />
      )}

      {paso === 3 && (
        <PasoFecha
          avanzarPaso={avanzarPaso}
          retrocederPaso={retrocederPaso}
          actualizarFormulario={actualizarFormulario}
        />
      )}

      {paso === 4 && (
        <PasoHora
          avanzarPaso={avanzarPaso}
          retrocederPaso={retrocederPaso}
          actualizarFormulario={actualizarFormulario}
        />
      )}

      {paso === 5 && (
        <PasoCliente
          avanzarPaso={avanzarPaso}
          retrocederPaso={retrocederPaso}
          actualizarFormulario={actualizarFormulario}
        />
      )}

      {paso === 6 && (
        <ResumenReserva
          formulario={formulario}
          retrocederPaso={retrocederPaso}
        />
      )}
    </div>
  );
};

export default Reserva;