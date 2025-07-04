// src/admin/GestionProductos.jsx
import { useState, useEffect } from 'react';

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    detalle: '',
    categoria: '',
    precio: '',
    imagen: null
  });
  const [editandoId, setEditandoId] = useState(null);

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setNuevo({ ...nuevo, imagen: files[0] });
    } else {
      setNuevo({ ...nuevo, [name]: value });
    }
  };

  // Obtener todos los productos desde la API
  const obtenerProductos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/productos');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Guardar o actualizar producto
  const guardarProducto = async () => {
    if (!nuevo.nombre || !nuevo.categoria || !nuevo.precio || !nuevo.imagen) {
      alert('Todos los campos son requeridos');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nuevo.nombre);
    formData.append('detalle', nuevo.detalle);
    formData.append('categoria', nuevo.categoria);
    formData.append('precio', nuevo.precio);
    formData.append('imagen', nuevo.imagen);

    const endpoint = editandoId
      ? `http://localhost:3000/api/productos/${editandoId}`
      : 'http://localhost:3000/api/productos';
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        body: formData
      });

      if (!res.ok) throw new Error();

      alert(editandoId ? 'Producto actualizado' : 'Producto agregado');
      setNuevo({ nombre: '', detalle: '', categoria: '', precio: '', imagen: null });
      setEditandoId(null);
      obtenerProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  // Eliminar producto por ID
  const eliminarProducto = async (id) => {
    const confirmar = confirm('¿Deseas eliminar este producto?');
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/api/productos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      alert('Producto eliminado');
      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Cargar producto al formulario para editar
  const cargarProducto = (producto) => {
    setNuevo({
      nombre: producto.nombre,
      detalle: producto.detalle,
      categoria: producto.categoria,
      precio: producto.precio,
      imagen: null
    });
    setEditandoId(producto.id);
  };

  return (
    <div className="container py-5 text-white">
      <h2>Gestión de Productos</h2>

      {/* Formulario de creación/edición */}
      <div className="row mb-4">
        <div className="col-md-5">
          <input
            name="nombre"
            placeholder="Nombre"
            value={nuevo.nombre}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <textarea
            name="detalle"
            placeholder="Detalle (hasta 450 caracteres)"
            value={nuevo.detalle}
            onChange={handleChange}
            className="form-control mb-2"
            maxLength={450}
            rows={2}
          ></textarea>
          <select
            name="categoria"
            value={nuevo.categoria}
            onChange={handleChange}
            className="form-control mb-2"
          >
            <option value="">Seleccionar categoría</option>
            <option value="Perfumes de Hombre">Perfumes de Hombre</option>
            <option value="Perfumes de Mujer">Perfumes de Mujer</option>
            <option value="Cosméticos">Cosméticos</option>
            <option value="Boutique">Boutique</option>
          </select>
          <input
            name="precio"
            type="number"
            placeholder="Precio"
            value={nuevo.precio}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <input
            type="file"
            name="imagen"
            accept=".png,.jpg,.jpeg"
            onChange={handleChange}
            className="form-control mb-2"
          />
          <button
            onClick={guardarProducto}
            className={`btn ${editandoId ? 'btn-success' : 'btn-warning'} w-100`}
          >
            {editandoId ? 'Guardar producto' : 'Agregar Producto'}
          </button>
        </div>
      </div>

      {/* Tabla de productos */}
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Detalle</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>${producto.precio.toLocaleString()}</td>
              <td>{producto.detalle}</td>
              <td>
                <img
                  src={`http://localhost:3000/images/${producto.imagen}`}
                  alt={producto.nombre}
                  width="80"
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => cargarProducto(producto)}
                >
                  Modificar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarProducto(producto.id)}
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

export default GestionProductos;