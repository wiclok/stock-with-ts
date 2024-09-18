import { FC, useEffect, useState } from "react";
import styles from "../assets/styles/app.module.css";
import { UseUserFetch } from "../hooks/useUserFetch";
import { CustomFetch } from "../api/customFetch";

export const Home: FC = () => {
  const { userData, error } = UseUserFetch();
  const [products, setProducts] = useState<number>(0); // Cambiado para manejar el número de productos

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await CustomFetch('http://localhost:3000/api/product/countProducts','GET');
        setProducts(response.count);
      } catch (err) {
        console.error('Error fetching product count:', err);
      }
    };

    fetchProductCount();
  }, []); // Añadir dependencia vacía para que solo se ejecute una vez al montar

  return (
    <>
      <header className={`${styles.header} bg-primary text-white p-4`}>
        <h1 className="display-4 mb-0">Sistema de gestión de stock</h1>
      </header>
      <div className={`${styles.content} p-4`}>
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-4">
            <div className={`${styles.card} card bg-info text-white`}>
              <div className="card-body">
                <h5 className="card-title">Total de Productos</h5>
                <p className="card-text display-4">{products}</p> {/* Mostrar número real */}
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.welcomeSection} mt-4 p-4 bg-light rounded`}>
          <h2 className="h3 mb-3">
            Bienvenido al sistema de stock de FORMOTEX
          </h2>
          <p className="lead">
            Administre su inventario con facilidad y eficiencia.
          </p>

          {/* Mostrar los datos del usuario si están disponibles */}
          {userData ? (
            <div className="mt-4">
              <h3>Bienvenido, {userData.userName}</h3>
              <p>Correo: {userData.email}</p>
            </div>
          ) : (
            <p>Cargando información del usuario...</p>
          )}

          {/* Mostrar mensaje de error si existe */}
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </>
  );
};
