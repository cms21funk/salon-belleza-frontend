import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const GestionStaff = () => {
  const [usuarios, setUsuarios] = useState([]);
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
  const [editandoId, setEditandoId] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/usuarios`);
      const data = await res.json();
      setUsuarios(data.filter((u) => u.rol === 'staff'));
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setNuevo({ ...nuevo, imagen: files[0] });
    } else {
      setNuevo({ ...nuevo, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(nuevo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const url = editandoId
        ? `${BASE_URL}/auth/usuarios/${editandoId}`
        : `${BASE_URL}/auth/registro-staff`;

      const method = editandoId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        obtenerUsuarios();
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
        setEditandoId(null);
      }
    } catch (error) {
      console.error('Error al enviar:', error);
    }
  };

  const handleEditar = (usuario) => {
    setNuevo({
      nombre: usuario.nombre,
      rol: usuario.rol,
      especialidad: usuario.especialidad,
      genero: usuario.genero,
      email: usuario.email,
      password: usuario.password,
      comuna: usuario.comuna,
      imagen: null,
    });
    setEditandoId(usuario.id);
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      const res = await fetch(`${BASE_URL}/auth/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        obtenerUsuarios();
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Gestión del Staff</h2>

      {/* FORMULARIO */}
      <div className="row mb-3">
        {/* inputs del formulario */}
        <div className="col">
          <input name="nombre" value={nuevo.nombre} onChange={handleChange} placeholder="Nombre" className="form-control" />
        </div>
        <div className="col">
          <select name="rol" value={nuevo.rol} onChange={handleChange} className="form-control">
            <option value="">Seleccionar Rol</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <div className="col">
          <select name="especialidad" value={nuevo.especialidad} onChange={handleChange} className="form-control">
            <option value="">Seleccionar Especialidad</option>
            <option value="Peluqueria">Peluquería</option>
            <option value="Manicura">Manicura</option>
            <option value="Depiladora">Depilación</option>
            <option value="Esteticista">Esteticista</option>
            <option value="Pestanas y Cejas">Pestañas y Cejas</option>
          </select>
        </div>
        <div className="col">
          <select name="genero" value={nuevo.genero} onChange={handleChange} className="form-control">
            <option value="">Seleccionar Género</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
          </select>
        </div>
        <div className="col">
          <input name="email" value={nuevo.email} onChange={handleChange} placeholder="Correo" className="form-control" />
        </div>
        <div className="col">
          <input name="password" value={nuevo.password} onChange={handleChange} placeholder="Contraseña" className="form-control" />
        </div>
        <div className="col">
          <select name="comuna" value={nuevo.comuna} onChange={handleChange} className="form-control">
            <option value="">Seleccionar Comuna</option>
            <option value="Maipu">Maipú</option>
            <option value="La Florida">La Florida</option>
            <option value="Puente Alto">Puente Alto</option>
            <option value="Vitacura">Vitacura</option>
          </select>
        </div>
        <div className="col">
          <input type="file" name="imagen" onChange={handleChange} className="form-control" />
        </div>
      </div>

      <button className="btn btn-warning w-100 mb-4" onClick={handleSubmit}>
        {editandoId ? 'Guardar Cambios' : 'Registrar Staff'}
      </button>

      {/* TABLA */}
      <table className="table table-dark table-bordered table-hover">
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
          {usuarios.map((prof) => (
            <tr key={prof.id}>
              <td>{prof.nombre}</td>
              <td>{prof.rol}</td>
              <td>{prof.especialidad}</td>
              <td>{prof.genero}</td>
              <td>{prof.email}</td>
              <td>{prof.comuna}</td>
              <td>
                {prof.imagen && prof.imagen.startsWith('http') ? (
                  <img src={prof.imagen} alt={prof.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                ) : (
                  'Sin imagen'
                )}
              </td>
              <td>
                <button onClick={() => handleEditar(prof)} className="btn btn-warning btn-sm me-2">Modificar</button>
                <button onClick={() => handleEliminar(prof.id)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionStaff;