// src/hooks/useCartLogic.js
import { useState } from 'react';

// Hook personalizado para lógica del carrito
const useCartLogic = () => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  // Remover producto del carrito
  const removerDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Actualizar cantidad de un producto
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removerDelCarrito(id);
    } else {
      setCarrito(prev =>
        prev.map(item =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
    }
  };

  // Total de productos y monto acumulado
  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalMonto = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return {
    carrito,
    agregarAlCarrito,
    removerDelCarrito,
    vaciarCarrito,
    actualizarCantidad,
    totalProductos,
    totalMonto,
  };
};

export default useCartLogic;