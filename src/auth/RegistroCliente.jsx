// src/auth/RegistroCliente.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegistroCliente.css'; // Asegúrate de tener este archivo

const RegistroCliente = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    genero: '',
    comuna: '',
    email: '',
    password: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formulario.password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const datosCompletos = {
      ...formulario,
      rol: 'cliente',
      especialidad: 'comprar'
    };

    try {
      const response = await fetch('https://salon-belleza-backend.onrender.com/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosCompletos)
      });

      if (!response.ok) throw new Error('Error en el registro');
      setMostrarModal(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar cliente.');
    }
  };

  const comunas = [/* ... mismo array ... */ 'Santiago', 'Puente Alto', 'La Florida', 'Maipú' , 'Talagante' , 'Tiltil', 'Vitacura'];

  return (
    <div className="registro-container">
      <h2 className="titulo">Registro de Cliente</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <input name="nombre" placeholder="Nombre completo" className="form-control mb-3" onChange={handleChange} required />
        <select name="genero" className="form-control mb-3" onChange={handleChange} value={formulario.genero} required>
          <option value="">Seleccione género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
        <select name="comuna" className="form-control mb-3" onChange={handleChange} value={formulario.comuna} required>
          <option value="">Seleccione comuna</option>
          {comunas.map((comuna) => (
            <option key={comuna} value={comuna}>{comuna}</option>
          ))}
        </select>
        <input name="email" type="email" placeholder="Correo electrónico" className="form-control mb-3" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" className="form-control mb-3" onChange={handleChange} required />
        <input type="password" placeholder="Confirmar contraseña" className="form-control mb-3" onChange={(e) => setConfirmPassword(e.target.value)} required />

        <div className="form-check mb-3 text-start">
          <input className="form-check-input" type="checkbox" id="terminos" onChange={() => setAceptaTerminos(!aceptaTerminos)} />
          <label className="form-check-label" htmlFor="terminos">
            Acepto los <strong>términos y condiciones</strong>
          </label>
        </div>

        <button className="btn btn-warning w-100" disabled={!aceptaTerminos}>Registrarse</button>
      </form>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-registro">
          <div className="modal-contenido animate__animated animate__fadeInDown">
            <h4 className="text-center mb-3">🎉 Registro exitoso</h4>
            <p className="text-center">Ya puedes iniciar sesión.</p>
            <div className="text-center">
              <button className="btn btn-outline-light" onClick={() => navigate('/login')}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroCliente;