// src/admin/GestionStaff.jsx
import { useEffect, useState } from 'react';

const GestionStaff = () => {
  // Estado inicial para el formulario de staff
  const [nuevo, setNuevo] = useState({
    nombre: '',
    rol: '',
    especialidad: '',
    genero: '',
    email: '',
    password: '',
    comuna: '',
    imagen: null,
  });

  const [staffList, setStaffList] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  // Datos predefinidos para selects
  const rolesDisponibles = ['admin', 'staff'];
  const especialidades = ['Administrador', 'Peluqueria', 'Manicura', 'Depiladora', 'Esteticista', 'Pestanas y Cejas', 'Vendedora', 'Promotora'];
  const generos = ['Masculino', 'Femenino'];
  const comunas = [
    'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'Lampa', 'La Pintana', 'La Reina',
    'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipu', 'María Pinto', 'Melipilla', 'Ñuñoa',
    'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel',
    'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo', 'San Joaquin',
    'San Jose de Maipo', 'San Miguel', 'San Pedro', 'San Ramon', 'Santiago', 'Talagante', 'Tiltil', 'Vitacura'
  ];

  // Maneja cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setNuevo({ ...nuevo, imagen: files[0] });
    } else {
      setNuevo({ ...nuevo, [name]: value });
    }
  };

  // Obtener lista de staff desde backend
  const obtenerStaff = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/profesionales');
      const data = await res.json();
      setStaffList(data);
    } catch (error) {
      console.error('Error al cargar staff:', error);
    }
  };

  useEffect(() => {
    obtenerStaff();
  }, []);

  // Enviar datos (crear o actualizar)
  const enviarDatos = async (e) => {
    e.preventDefault();

    const metodo = modoEdicion ? 'PUT' : 'POST';
    const url = modoEdicion
      ? `http://localhost:3000/api/auth/usuarios/${idSeleccionado}`
      : 'http://localhost:3000/api/auth/registro-staff';

    const formData = new FormData();
    Object.keys(nuevo).forEach((key) => {
      if (nuevo[key]) formData.append(key, nuevo[key]);
    });

    try {
      const response = await fetch(url, {
        method: metodo,
        body: formData,
      });

      if (!response.ok) throw new Error('Error al guardar cambios');

      alert(modoEdicion ? 'Modificación exitosa' : 'Registro exitoso');
      setNuevo({
        nombre: '',
        rol: '',
        especialidad: '',
        genero: '',
        email: '',
        password: '',
        comuna: '',
        imagen: null,
      });
      setModoEdicion(false);
      setIdSeleccionado(null);
      obtenerStaff();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar cambios.');
    }
  };

  // Cargar datos en el formulario para modificar
  const cargarParaEditar = (prof) => {
    setNuevo({
      nombre: prof.nombre,
      rol: prof.rol,
      especialidad: prof.especialidad,
      genero: prof.genero,
      email: prof.email,
      password: '',
      comuna: prof.comuna,
      imagen: null,
    });
    setModoEdicion(true);
    setIdSeleccionado(prof.id);
  };

  // Eliminar profesional
  const eliminarProfesional = async (id) => {
    const confirmar = confirm('¿Seguro que deseas eliminar este profesional?');
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/api/auth/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar profesional');
      alert('Eliminado correctamente');
      obtenerStaff();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar profesional.');
    }
  };

  return (
    <div className="container py-4 text-white">
      <h3 className="mb-3">Gestión del Staff</h3>

      {/* Formulario de registro / edición */}
      <form onSubmit={enviarDatos} className="mb-4" encType="multipart/form-data">
        <div className="row g-2">
          <div className="col-md-3">
            <input name="nombre" className="form-control" placeholder="Nombre" onChange={handleChange} value={nuevo.nombre} required />
          </div>
          <div className="col-md-3">
            <select name="rol" className="form-control" onChange={handleChange} value={nuevo.rol} required>
              <option value="">Seleccionar Rol</option>
              {rolesDisponibles.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <select name="especialidad" className="form-control" onChange={handleChange} value={nuevo.especialidad} required>
              <option value="">Seleccionar Especialidad</option>
              {especialidades.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <select name="genero" className="form-control" onChange={handleChange} value={nuevo.genero} required>
              <option value="">Seleccionar Género</option>
              {generos.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="row g-2 mt-2">
          <div className="col-md-3">
            <input name="email" type="email" className="form-control" placeholder="Correo" onChange={handleChange} value={nuevo.email} required />
          </div>
          <div className="col-md-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder={modoEdicion ? "Dejar en blanco para no cambiar" : "Contraseña"}
              onChange={handleChange}
              value={nuevo.password}
            />
          </div>
          <div className="col-md-3">
            <select name="comuna" className="form-control" onChange={handleChange} value={nuevo.comuna} required>
              <option value="">Seleccionar Comuna</option>
              {comunas.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <input name="imagen" type="file" className="form-control" onChange={handleChange} accept="image/*" />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12 d-grid">
            <button type="submit" className={`btn ${modoEdicion ? 'btn-success' : 'btn-warning'}`}>
              {modoEdicion ? 'Guardar Cambios' : 'Registrar Staff'}
            </button>
          </div>
        </div>
      </form>

      {/* Tabla de profesionales */}
      <h5 className="mt-4">Profesionales registrados</h5>
      <table className="table table-dark table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Especialidad</th>
            <th>Género</th>
            <th>Email</th>
            <th>Comuna</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((prof) => (
            <tr key={prof.id}>
              <td>{prof.nombre}</td>
              <td>{prof.rol}</td>
              <td>{prof.especialidad}</td>
              <td>{prof.genero}</td>
              <td>{prof.email}</td>
              <td>{prof.comuna}</td>
              <td>
                {prof.imagen ? (
                  <img
                    src={`http://localhost:3000/images/${prof.imagen}`}
                    alt={prof.nombre}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                ) : 'Sin imagen'}
              </td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => cargarParaEditar(prof)}>Modificar</button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminarProfesional(prof.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionStaff;