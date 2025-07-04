// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './auth/useAuth';
import ProteccionRutas from './components/ProteccionRutas';
import { LikeProvider } from './context/LikeContext';
import GestionServicios from './admin/GestionServicios';

// Páginas públicas
import Home from './pages/Home';
import Reserva from './pages/Reserva';
import Servicios from './pages/Servicios';
import Productos from './pages/Productos';
import Staff from './pages/Staff';
import QuienesSomos from './pages/QuienesSomos';
import Politicas from './pages/Politicas';
import Login from './auth/Login';
import RegistroCliente from './auth/RegistroCliente';
import Carrito from './pages/Carrito';
import MisMensajes from './staff/MisMensajes';

// Páginas protegidas
import DashboardAdmin from './admin/DashboardAdmin';
import ObservacionDetalleAdmin from './admin/ObservacionDetalleAdmin';
import PanelStaff from './staff/PanelStaff';

import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LikeProvider>
          <Router>
            <div className="app-bg d-flex flex-column min-vh-100">
              <Navbar />
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/reserva" element={<Reserva />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/quienes-somos" element={<QuienesSomos />} />
                <Route path="/politicas" element={<Politicas />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<RegistroCliente />} />

                {/* Rutas protegidas - Admin */}
                <Route
                  path="/admin"
                  element={
                    <ProteccionRutas rolesPermitidos={['admin']}>
                      <DashboardAdmin />
                    </ProteccionRutas>
                  }
                />
                <Route
                  path="/admin/observaciones/:id"
                  element={
                    <ProteccionRutas rolesPermitidos={['admin']}>
                      <ObservacionDetalleAdmin />
                    </ProteccionRutas>
                  }
                />
                <Route
                  path="/admin/gestion-servicios"
                  element={
                    <ProteccionRutas rolesPermitidos={['admin']}>
                      <GestionServicios />
                    </ProteccionRutas>
                  }
                />

                {/* Rutas protegidas - Staff */}
                <Route
                  path="/staff"
                  element={
                    <ProteccionRutas rolesPermitidos={['staff']}>
                      <PanelStaff />
                    </ProteccionRutas>
                  }
                />
                <Route
                  path="/mis-mensajes"
                  element={
                    <ProteccionRutas rolesPermitidos={['staff']}>
                      <MisMensajes />
                    </ProteccionRutas>
                  }
                />
              </Routes>
              <Footer />
            </div>
          </Router>
        </LikeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;