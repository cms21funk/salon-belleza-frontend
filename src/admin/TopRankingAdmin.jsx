import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const TopRankingAdmin = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const obtenerRanking = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/productos/populares`);
        const data = await res.json();
        setRanking(data);
      } catch (error) {
        console.error('Error al cargar ranking:', error);
      }
    };

    obtenerRanking();
  }, []);

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4">Ranking Top 10 - Productos con más Likes ❤️</h2>

      <div className="table-responsive mb-5">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Total Likes</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((item, i) => (
              <tr key={item.producto_id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={item.imagen}
                    alt={item.producto_nombre}
                    width="40"
                    height="40"
                    className="rounded shadow"
                  />
                </td>
                <td>{item.producto_nombre}</td>
                <td>{item.categoria}</td>
                <td>❤️ {item.total_likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="mb-3">Gráfico de Productos Populares</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={ranking}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="producto_nombre" type="category" width={200} />
          <Tooltip />
          <Bar dataKey="total_likes" fill="#ffc107" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopRankingAdmin;