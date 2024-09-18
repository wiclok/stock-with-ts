import { FC } from "react";
import styles from "../assets/styles/app.module.css";

export const Home: FC = () => {

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
                <p className="card-text display-4">1,234</p>
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
        </div>
      </div>
    </>
  );
};
