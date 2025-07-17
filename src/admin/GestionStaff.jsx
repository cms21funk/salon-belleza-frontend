import { useEffect, useState } from 'react';

const GestionStaff = () => {
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

  const rolesDisponibles = ['admin', 'staff'];
  const especialidades = ['Administrador', 'Peluqueria', 'Manicura', 'Depiladora', 'Esteticista', 'Pestanas y Cejas', 'Vendedora', 'Promotora'];
  const generos = ['Masculino', 'Femenino'];
  const comunas = ['Maipu', 'Puente Alto', 'Vitacura'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setNuevo({ ...nuevo, imagen: files[0] });
    } else {
      setNuevo({ ...nuevo, [name]: value });
    }
  };

  const obtenerStaff = async () => {
    try {
      const res = await fetch('https://salon-belleza-backend.onrender.com/api/profesionales');
      const data = await res.json();
      setStaffList(data);
    } catch (error) {
      console.error('Error al cargar staff:', error);
    }
  };

  useEffect(() => {
    obtenerStaff();
  }, []);

  const subirACloudinary = async (archivo) => {
  const formData = new FormData();
  formData.append("file", archivo, archivo.name);
  formData.append('upload_preset', 'salon_unsigned_upload'); // ✅ Correcto

  const res = await fetch(`https://api.cloudinary.com/v1_1/dpu1b6qpx/image/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  console.log("🔄 Resultado Cloudinary:", data); // 👈 DEBUG

  return data.secure_url;
};

  const enviarDatos = async (e) => {
  e.preventDefault();

  const metodo = modoEdicion ? 'PUT' : 'POST';
  const url = modoEdicion
    ? `https://salon-belleza-backend.onrender.com/api/auth/usuarios/${idSeleccionado}`
    : 'https://salon-belleza-backend.onrender.com/api/auth/registro-staff';

  let imagenUrl = null;

  // 🔍 Subir a Cloudinary si se seleccionó archivo
  if (
    nuevo.imagen &&
    (nuevo.imagen instanceof File ||
      (nuevo.imagen.constructor && nuevo.imagen.constructor.name === 'File'))
  ) {
    imagenUrl = await subirACloudinary(nuevo.imagen);
  }

  // 🧠 Si es edición y no subió nueva imagen, conservamos la imagen anterior
  const imagenFinal = imagenUrl || (!modoEdicion ? null : undefined);

  const payload = {
    ...nuevo,
    imagen: imagenFinal,
  };

  try {
    const response = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

  const eliminarProfesional = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este profesional?')) return;

    try {
      const res = await fetch(`https://salon-belleza-backend.onrender.com/api/auth/usuarios/${id}`, {
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
      <form onSubmit={enviarDatos} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input name="nombre" type="text" className="form-control" placeholder="Nombre" value={nuevo.nombre} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <select name="rol" className="form-control" value={nuevo.rol} onChange={handleChange}>
              <option value="">Seleccionar Rol</option>
              {rolesDisponibles.map((rol) => <option key={rol} value={rol}>{rol}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <select name="especialidad" className="form-control" value={nuevo.especialidad} onChange={handleChange}>
              <option value="">Seleccionar Especialidad</option>
              {especialidades.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <select name="genero" className="form-control" value={nuevo.genero} onChange={handleChange}>
              <option value="">Seleccionar Género</option>
              {generos.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <div className="row g-2 mt-2">
          <div className="col-md-3">
            <input name="email" type="email" className="form-control" placeholder="Correo" value={nuevo.email} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <input name="password" type="password" className="form-control" placeholder="Contraseña" value={nuevo.password} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <select name="comuna" className="form-control" value={nuevo.comuna} onChange={handleChange}>
              <option value="">Seleccionar Comuna</option>
              {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
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

      <h5 className="mt-4">Profesionales registrados</h5>
      <table className="table table-dark table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th><th>Rol</th><th>Especialidad</th><th>Género</th><th>Email</th><th>Comuna</th><th>Imagen</th><th>Acciones</th>
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
                  <img src={prof.imagen} alt={prof.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
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