import { useState } from "react";
import styles from "./assets/styles/app.module.css";
import { Aside } from "./components/aside";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import Register from "./components/form/register/register";
import useAuth from "./hooks/useAuth";

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const { authState } = useAuth();

  console.log(authState.isLogged);

  // Verificación de autenticación
  const renderContent = () => {
    if (!authState.isLogged && activeTab !== 'Home') {
      // Si el usuario no está logueado y no está en Home, mostrar el formulario de registro
      return <Register />;
    }

    // Mostrar las páginas basadas en la pestaña activa
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'Dashboard':
        return authState.isLogged ? <h1>Seccion de Dashboards en desarrollo... 👀</h1> : <Register />;
      case 'Productos':
        return authState.isLogged ? <Product /> : <Register />;
      case 'Categorias':
        return authState.isLogged ? <h1>Categorias</h1> : <Register />;
      case 'Marcas':
        return authState.isLogged ? <h1>Marcas</h1> : <Register />;
      case 'Sucursales':
        return authState.isLogged ? <h1>Sucursales</h1> : <Register />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`${styles.container} d-flex`}>
      <Aside activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={`${styles.mainContent}`}>
        {renderContent()}
      </main>
    </div>
  );
}
