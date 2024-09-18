import { FC, useState } from 'react';
import styles from '../assets/styles/branch.module.css';
import { useFetchUser } from '../hooks/useFetchUser';
import { CustomFetch } from '../api/customFetch';
import Swal from 'sweetalert2';

export const User: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    userName: '',
    email: '',
    password: '',
    roleId: '',
  });

  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useFetchUser();

  if (usersLoading) return <p>Loading...</p>;
  if (usersError)
    return <p>Error fetching users: {usersError.message}</p>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: newUser.userName,
      email: newUser.email,
      password: newUser.password,
      role: newUser.roleId,
    };

    const response = await CustomFetch('http://localhost:3000/api/user', 'POST', data);
    if (response) {
      Swal.fire('Éxito', 'Usuario agregado correctamente', 'success');
      setNewUser({
        userName: '',
        email: '',
        password: '',
        roleId: '',
      });
      // Actualiza la lista de usuarios o maneja el éxito sin recargar
    } else {
      Swal.fire('Error', 'Hubo un error al agregar el usuario', 'error');
    }
    setShowModal(false);
  };

  return (
    <div className={styles.userListContainer}>
      <h2 className={`${styles.userListTitle} mb-4`}>Lista de Usuarios</h2>
      <div className={`${styles.userList} table-responsive`}>
        <table className='table table-hover'>
          <thead className={styles.userListHeader}>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={styles.userItem}>
                <td>{user?.userName}</td>
                <td>{user?.email}</td>
                <td>{user?.roleId}</td>
                <td>
                  <button className='btn btn-sm btn-outline-primary me-2'>
                    Editar
                  </button>
                  <button className='btn btn-sm btn-outline-danger'>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`${styles.userListFooter} mt-3`}>
        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
          Agregar Usuario
        </button>
      </div>

      {/* Modal for adding new user */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Agregar Usuario</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='userName' className='form-label'>
                  Nombre
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='userName'
                  name='userName'
                  value={newUser.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Contraseña
                </label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={newUser.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='roleId' className='form-label'>
                  Rol
                </label>
                <select
                  className='form-select'
                  id='roleId'
                  name='roleId'
                  value={newUser.roleId}
                  onChange={handleInputChange}
                  required
                >
                  <option value='' disabled>
                    Seleccione el Rol
                  </option>
                  <option value='1'>Admin</option>
                  <option value='2'>User</option>
                </select>
              </div>
              <div className={styles.modalActions}>
                <button type='submit' className='btn btn-primary'>
                  Agregar
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
