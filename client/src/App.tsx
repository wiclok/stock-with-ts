import { useState } from "react";
import styles from "./assets/styles/app.module.css";
import { Aside } from "./components/aside";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import { Register } from "./components/form/register/register";
import useAuth from "./hooks/useAuth";
import { Login } from "./components/form/login/login";
import { Category } from "./components/Category";
import { Brand } from "./components/Brand";
import { User } from "./components/User";
import { Branch } from "./components/Branch";

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const { authState } = useAuth();

  const renderContent = () => {
    if (activeTab === 'Login') {
      return <Login setActiveTab={setActiveTab} />; 
    }

    if (activeTab === 'Register') {
      return <Register setActiveTab={setActiveTab}/>;
    }

    if (!authState.isLogged && activeTab !== 'Home') {
      return <Login setActiveTab={setActiveTab}/>;
    }

    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'Dashboard':
        return authState.isLogged ? <h1>Seccion de Dashboards en desarrollo... 👀</h1> : <Login setActiveTab={setActiveTab}/>;
      case 'Productos':
        return authState.isLogged ? <Product /> : <Login setActiveTab={setActiveTab}/>;
      case 'Categorias':
        return authState.isLogged ? <Category /> : <Login setActiveTab={setActiveTab}/>;
      case 'Marcas':
        return authState.isLogged ? <Brand /> : <Login setActiveTab={setActiveTab}/>;
      case 'Sucursales':
        return authState.isLogged ? <Branch /> : <Login setActiveTab={setActiveTab}/>;
      case 'Usuarios': 
        return authState.isLogged? <User /> : <Login setActiveTab={setActiveTab}/>;
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
