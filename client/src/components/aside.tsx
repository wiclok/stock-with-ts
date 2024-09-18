import { FC } from "react";
import styles from "../assets/styles/app.module.css";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

interface AsideProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Aside: FC<AsideProps> = ({ activeTab, setActiveTab }) => {
  const { authState, logout } = useAuth();


  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez cerrada la sesión no podrás acceder a tu cuenta",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        Swal.fire(
          "Cerrado",
          "Tu sesión ha sido cerrada",
          "success"
        );
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelado",
          "Tu sesión sigue abierta",
          "info"
        );
      }   
    });
  };

  return (
    <aside className={`${styles.sidebar} bg-dark text-light`}>
      <div className={`${styles.sidebarHeader} p-3`}>
        <h2 className="h4 mb-0">FORMOTEX</h2>
      </div>
      <nav className={`${styles.sidebarNav} nav flex-column`}>
        <a
          href="#"
          className={`${styles.navLink} nav-link ${
            activeTab === "Home" ? styles.focus : ""
          }`}
          onClick={() => setActiveTab("Home")}
        >
          Home
        </a>
        <a
          href="#"
          className={`${styles.navLink} nav-link ${
            activeTab === "Dashboard" ? styles.focus : ""
          }`}
          onClick={() => setActiveTab("Dashboard")}
        >
          Dashboard
        </a>
        <a
          href="#"
          className={`${styles.navLink} nav-link ${
            activeTab === "Productos" ? styles.focus : ""
          }`}
          onClick={() => setActiveTab("Productos")}
        >
          Productos
        </a>
        <a
          href="#"
          className={`${styles.navLink} nav-link ${
            activeTab === "Categorias" ? styles.focus : ""
          }`}
          onClick={() => setActiveTab("Categorias")}
        >
          Categorias
        </a>
        <a
          href="#"
          className={`${styles.navLink} nav-link ${
            activeTab === "Marcas" ? styles.focus : ""
          }`}
          onClick={() => setActiveTab("Marcas")}
        >
          Marcas
        </a>
        <a
          href="#"
          className={`${styles.navLink} nav-link ${
            activeTab === "Sucursales" ? styles.focus : ""
          }`}
          onClick={() => setActiveTab("Sucursales")}
        >
          Sucursales
        </a>
      </nav>
      {authState.isLogged && (
          <a href="#" className="btn btn-sm btn-outline-light" onClick={handleLogout}>
            Cerrar sesión
          </a>
      )}
    </aside>
  );
};
