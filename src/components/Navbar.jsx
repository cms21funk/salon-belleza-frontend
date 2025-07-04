import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/useAuth';

const Navbar = () => {
  const { totalProductos, totalMonto } = useCart();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
      <Link className="navbar-brand" to="/">
        <strong>SALÓN DE BELLEZA SARY SALGADO</strong>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reserva">Reserva tu hora</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/servicios">Servicios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/productos">Tienda Online</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/staff">Staff</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/quienes-somos">Quiénes somos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/politicas">Políticas</Link>
          </li>

          {/* Enlaces por rol */}
          {usuario?.rol === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link text-warning fw-bold" to="/admin">
                Dashboard Admin
              </Link>
            </li>
          )}
          {usuario?.rol === 'staff' && (
            <li className="nav-item">
              <Link className="nav-link text-info fw-bold" to="/mis-mensajes">
                Mis Mensajes
              </Link>
            </li>
          )}
        </ul>

        {/* Área de sesión, saludo y carrito */}
        <div className="text-white d-flex align-items-center">
          {/* Carrito */}
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/carrito')}
            className="me-3"
          >
            🛒 {totalProductos} productos | ${totalMonto.toLocaleString()}
          </span>

          {/* Saludo solo para clientes */}
          {usuario?.rol === 'cliente' && (
            <span className="me-3 text-warning fw-bold">
              Hola, {usuario.nombre?.split(' ')[0]}!
            </span>
          )}

          {/* Botón sesión */}
          {usuario ? (
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <Link className="btn btn-outline-warning btn-sm" to="/login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;