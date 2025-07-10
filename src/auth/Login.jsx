// src/auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import '../styles/Login.css';

const Login = () => {
  const [formulario, setFormulario] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formulario;
      const response = await fetch('https://salon-belleza-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      // ✅ Guardar token y usuario en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // ✅ Actualizar estado global
      login(data.usuario);

      // ✅ Redirección según rol
      switch (data.usuario.rol) {
        case 'admin':
          navigate('/admin');
          break;
        case 'staff':
          navigate('/staff');
          break;
        case 'cliente':
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al iniciar sesión.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>

      {error && (
        <div className="alert alert-danger text-center animate__animated animate__shakeX">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario-login">
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <button className="btn btn-warning w-100">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;