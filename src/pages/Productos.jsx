// src/pages/Productos.jsx
import { useState } from 'react';
import GaleriaProducto from '../components/GaleriaProducto';
import '../styles/global.css';

// Categorías de productos disponibles
const productos = [
  {
    id: 'Perfumes de Hombre',
    nombre: 'Perfumes de Hombre',
    descripcion: 'Fragancias masculinas elegantes y duraderas.',
    imagen: '/images/perfumes-hombre.png'
  },
  {
    id: 'Perfumes de Mujer',
    nombre: 'Perfumes de Mujer',
    descripcion: 'Aromas femeninos sofisticados y encantadores.',
    imagen: '/images/perfumes-mujer.png'
  },
  {
    id: 'Cosméticos',
    nombre: 'Cosméticos',
    descripcion: 'Productos de maquillaje y cuidado facial.',
    imagen: '/images/cosmeticos.png'
  },
  {
    id: 'Boutique',
    nombre: 'Boutique',
    descripcion: 'Accesorios y artículos exclusivos.',
    imagen: '/images/images/boutique.png'
  }
];

const Productos = () => {
  const [categoriaActiva, setCategoriaActiva] = useState(null); // Estado para mostrar galería

  return (
    <div className="app-bg">
      <div className="servicios-section">
        <h2 className="text-center text-light pt-5">Nuestros Productos</h2>

        <div className="container mt-4">
          <div className="row">
            {productos.map((producto) => (
              <div className="col-md-6 col-lg-3 mb-4" key={producto.id}>
                <div className="card h-100 bg-black text-white servicio-card">
                  <img
                    src={producto.imagen}
                    className="card-img-top"
                    alt={producto.nombre}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text flex-grow-1">{producto.descripcion}</p>
                    <button
                      className="btn btn-outline-light mt-3"
                      onClick={() => setCategoriaActiva(producto.id)}
                    >
                      Ver productos y precios
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Muestra galería de productos de la categoría seleccionada */}
          {categoriaActiva && (
            <GaleriaProducto
              categoria={categoriaActiva}
              onCerrar={() => setCategoriaActiva(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Productos;