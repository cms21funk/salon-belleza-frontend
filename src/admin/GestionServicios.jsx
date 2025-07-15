// src/admin/GestionServicios.jsx
import { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://salon-belleza-backend.onrender.com';

const GestionServicios = () => {
  const [servicio, setServicio] = useState('');
  const [tipo, setTipo] = useState('');
  const [profesionalId, setProfesionalId] = useState('');
  const [detalle, setDetalle] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState(null);

  const [profesionales, setProfesionales] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resPro = await fetch(`${BASE_URL}/api/usuarios`);
        const dataPro = await resPro.json();
        setProfesionales(dataPro.filter(u => u.rol === 'staff'));

        const resServ = await fetch(`${BASE_URL}/api/servicios`);
        const dataServ = await resServ.json();
        setServicios(dataServ);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, []);

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
      ? `${BASE_URL}/api/servicios/${editandoId}`
      : `${BASE_URL}/api/servicios`;
    const method = editandoId ? 'PUT' : 'POST';

    await fetch(url, { method, body: formData });

    // Limpiar formulario
    setServicio('');
    setTipo('');
    setDetalle('');
    setPrecio('');
    setImagen(null);
    setProfesionalId('');
    setEditandoId(null);

    const res = await fetch(`${BASE_URL}/api/servicios`);
    const data = await res.json();
    setServicios(data);
  };

  const eliminarServicio = async (id) => {
    if (!window.confirm('¿Eliminar este servicio?')) return;
    await fetch(`${BASE_URL}/api/servicios/${id}`, { method: 'DELETE' });
    setServicios(servicios.filter(s => s.id !== id));
  };

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

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <select className="form-select" value={servicio} onChange={(e) => setServicio(e.target.value)} required>
              <option value="">Servicio</option>
              <option value="Peluqueria">Peluquería</option>
              <option value="Manicura">Manicura</option>
              <option value="Depiladora">Depiladora</option>
              <option value="Esteticista">Esteticista</option>
              <option value="Pestañas y Cejas">Pestañas y Cejas</option>
            </select>
          </div>

          <div className="col-md-3">
            <input type="text" placeholder="Tipo de servicio" className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
          </div>

          <div className="col-md-3">
            <select className="form-select" value={profesionalId} onChange={(e) => setProfesionalId(e.target.value)} required>
              <option value="">Profesional</option>
              {profesionales.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input type="number" placeholder="Precio" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
          </div>

          <div className="col-md-6">
            <textarea className="form-control" placeholder="Detalle del servicio (máx 300 caracteres)" maxLength={300} value={detalle} onChange={(e) => setDetalle(e.target.value)}></textarea>
          </div>

          <div className="col-md-6">
            <input type="file" className="form-control" onChange={(e) => setImagen(e.target.files[0])} />
          </div>
        </div>

        <button className="btn btn-warning mt-3">{editandoId ? 'Guardar cambios' : 'Agregar Servicio'}</button>
      </form>

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
                    src={s.imagen}
                    alt="Servicio"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => editarServicio(s)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminarServicio(s.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionServicios;