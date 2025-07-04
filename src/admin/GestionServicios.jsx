// src/admin/GestionServicios.jsx
import { useEffect, useState } from 'react';

const GestionServicios = () => {
  // Estados del formulario
  const [servicio, setServicio] = useState('');
  const [tipo, setTipo] = useState('');
  const [profesionalId, setProfesionalId] = useState('');
  const [detalle, setDetalle] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);

  // Datos cargados desde la API
  const [profesionales, setProfesionales] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  // Carga inicial de datos (profesionales y servicios)
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resPro = await fetch('http://localhost:3000/api/usuarios');
        const dataPro = await resPro.json();
        setProfesionales(dataPro.filter(u => u.rol === 'staff'));

        const resServ = await fetch('http://localhost:3000/api/servicios');
        const dataServ = await resServ.json();
        setServicios(dataServ);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, []);

  // Maneja el submit del formulario (crear o actualizar servicio)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('servicio', servicio);
    formData.append('tipo', tipo);
    formData.append('detalle', detalle);
    formData.append('precio', precio);
    formData.append('staff_id', profesionalId);
    if (imagen) formData.append('imagen', imagen);

    const url = editandoId
      ? `http://localhost:3000/api/servicios/${editandoId}`
      : 'http://localhost:3000/api/servicios';
    const method = editandoId ? 'PUT' : 'POST';

    await fetch(url, { method, body: formData });

    // Limpiar formulario y recargar servicios
    setServicio('');
    setTipo('');
    setDetalle('');
    setPrecio('');
    setImagen(null);
    setProfesionalId('');
    setEditandoId(null);

    const res = await fetch('http://localhost:3000/api/servicios');
    const data = await res.json();
    setServicios(data);
  };

  // Eliminar servicio
  const eliminarServicio = async (id) => {
    if (!window.confirm('¿Eliminar este servicio?')) return;
    await fetch(`http://localhost:3000/api/servicios/${id}`, { method: 'DELETE' });
    setServicios(servicios.filter(s => s.id !== id));
  };

  // Cargar datos en el formulario para editar
  const editarServicio = (s) => {
    setServicio(s.servicio);
    setTipo(s.tipo);
    setDetalle(s.detalle);
    setPrecio(s.precio);
    setProfesionalId(s.staff_id);
    setEditandoId(s.id);
  };

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4">Gestión de Servicios</h2>

      {/* Formulario de creación/edición */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          {/* Categoría general del servicio */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              required
            >
              <option value="">Servicio</option>
              <option value="Peluqueria">Peluquería</option>
              <option value="Manicura">Manicura</option>
              <option value="Depiladora">Depiladora</option>
              <option value="Esteticista">Esteticista</option>
              <option value="Pestañas y Cejas">Pestañas y Cejas</option>
            </select>
          </div>

          {/* Tipo específico dentro del servicio */}
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Tipo de servicio"
              className="form-control"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
          </div>

          {/* Profesional asignado */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={profesionalId}
              onChange={(e) => setProfesionalId(e.target.value)}
              required
            >
              <option value="">Profesional</option>
              {profesionales.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          {/* Precio del servicio */}
          <div className="col-md-3">
            <input
              type="number"
              placeholder="Precio"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>

          {/* Descripción del servicio */}
          <div className="col-md-6">
            <textarea
              className="form-control"
              placeholder="Detalle del servicio (máx 300 caracteres)"
              maxLength={300}
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
            ></textarea>
          </div>

          {/* Imagen del servicio */}
          <div className="col-md-6">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImagen(e.target.files[0])}
            />
          </div>
        </div>

        <button className="btn btn-warning mt-3">
          {editandoId ? 'Guardar cambios' : 'Agregar Servicio'}
        </button>
      </form>

      {/* Tabla con servicios disponibles */}
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Tipo</th>
            <th>Profesional</th>
            <th>Detalle</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map(s => (
            <tr key={s.id}>
              <td>{s.servicio}</td>
              <td>{s.tipo}</td>
              <td>{s.nombre_profesional}</td>
              <td>{s.detalle}</td>
              <td>${s.precio}</td>
              <td>
                {s.imagen && (
                  <img
                    src={`http://localhost:3000/images/${s.imagen}`}
                    alt="Servicio"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => editarServicio(s)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarServicio(s.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionServicios;