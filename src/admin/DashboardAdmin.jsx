// src/admin/DashboardAdmin.jsx
//Importar React y hooks
import { useState } from 'react';

//Importar vistas del panel
import GestionStaff from './GestionStaff';
import GestionProductos from './GestionProductos';
import GestionComentarios from './GestionComentarios';
import ObservacionesStaff from './ObservacionesStaff';
import GestionServicios from './GestionServicios';
import TopRankingAdmin from './TopRankingAdmin'; 

const DashboardAdmin = () => {
  //Estado para controlar qué vista se muestra
  const [vista, setVista] = useState('staff');

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4">Panel de Administración</h2>

      {/*Botonera de navegación entre vistas */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button
          className={`btn ${vista === 'staff' ? 'btn-warning' : 'btn-outline-light'}`}
          onClick={() => setVista('staff')}
        >
          Gestión Staff
        </button>
        <button
          className={`btn ${vista === 'productos' ? 'btn-warning' : 'btn-outline-light'}`}
          onClick={() => setVista('productos')}
        >
          Gestión Productos
        </button>
        <button
          className={`btn ${vista === 'servicios' ? 'btn-warning' : 'btn-outline-light'}`}
          onClick={() => setVista('servicios')}
        >
          Gestión Servicios
        </button>
        <button
          className={`btn ${vista === 'comentarios' ? 'btn-warning' : 'btn-outline-light'}`}
          onClick={() => setVista('comentarios')}
        >
          Comentarios Clientes
        </button>
        <button
          className={`btn ${vista === 'observaciones' ? 'btn-warning' : 'btn-outline-light'}`}
          onClick={() => setVista('observaciones')}
        >
          Observaciones Staff
        </button>
        <button
          className={`btn ${vista === 'ranking' ? 'btn-warning' : 'btn-outline-light'}`}
          onClick={() => setVista('ranking')}
        >
          Ranking top 10
        </button>
      </div>

      {/*Renderizar componente según vista seleccionada */}
      {vista === 'staff' && <GestionStaff />}
      {vista === 'productos' && <GestionProductos />}
      {vista === 'servicios' && <GestionServicios />}
      {vista === 'comentarios' && <GestionComentarios />}
      {vista === 'observaciones' && <ObservacionesStaff />}
      {vista === 'ranking' && <TopRankingAdmin />}
    </div>
  );
};

export default DashboardAdmin;