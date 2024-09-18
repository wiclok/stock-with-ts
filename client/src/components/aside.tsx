import { FC } from 'react';
import styles from '../assets/styles/app.module.css';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { UseUserFetch } from '../hooks/useUserFetch';

interface AsideProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Aside: FC<AsideProps> = ({ activeTab, setActiveTab }) => {
  const { authState, logout } = useAuth();
  const { userData, error } = UseUserFetch();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez cerrada la sesión no podrás acceder a tu cuenta',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire('Cerrado', 'Tu sesión ha sido cerrada', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'Tu sesión sigue abierta', 'info');
      }
    });
  };

  return (
    <aside className={`${styles.sidebar} bg-dark text-light d-flex flex-column`}>
      <div className={`${styles.sidebarHeader} p-3`}>
        <h2 className='h4 mb-0'>FORMOTEX</h2>
      </div>
      <nav className={`${styles.sidebarNav} nav flex-column`}>
        <a
          className={`${styles.navLink} nav-link ${
            activeTab === 'Home' ? styles.focus : ''
          } ${styles.pointer}`}
          onClick={() => setActiveTab('Home')}
        >
          Home
        </a>
        <a
          className={`${styles.navLink} nav-link ${
            activeTab === 'Dashboard' ? styles.focus : ''
          } ${styles.pointer}`}
          onClick={() => setActiveTab('Dashboard')}
        >
          Dashboard
        </a>
        <a
          className={`${styles.navLink} nav-link ${
            activeTab === 'Productos' ? styles.focus : ''
          } ${styles.pointer}`}
          onClick={() => setActiveTab('Productos')}
        >
          Productos
        </a>
        <a
          className={`${styles.navLink} nav-link ${
            activeTab === 'Categorias' ? styles.focus : ''
          } ${styles.pointer}`}
          onClick={() => setActiveTab('Categorias')}
        >
          Categorias
        </a>
        <a
          className={`${styles.navLink} nav-link ${
            activeTab === 'Marcas' ? styles.focus : ''
          } ${styles.pointer}`}
          onClick={() => setActiveTab('Marcas')}
        >
          Marcas
        </a>
        <a
          className={`${styles.navLink} nav-link ${
            activeTab === 'Sucursales' ? styles.focus : ''
          } ${styles.pointer}`}
          onClick={() => setActiveTab('Sucursales')}
        >
          Sucursales
        </a>
        {userData?.roleId === 1 && authState.isLogged && (
          <a
            className={`${styles.navLink} nav-link ${styles.pointer}`}
            onClick={() => setActiveTab('Usuarios')}
          >
            Usuarios
          </a>
        )}
      </nav>
      <div className='mt-100 p-3'>
        {authState.isLogged ? (
          <a className='btn btn-sm btn-outline-light' onClick={handleLogout}>
            Cerrar sesión
          </a>
        ) : (
          <a
            className='btn btn-sm btn-outline-light'
            onClick={() => setActiveTab('Login')}
          >
            Iniciar Sesión
          </a>
        )}
        {error && <p className='text-danger'>{error}</p>}
      </div>
    </aside>
  );
};
