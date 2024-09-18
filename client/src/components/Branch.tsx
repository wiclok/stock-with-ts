import { FC, useState, useEffect } from 'react';
import styles from '../assets/styles/branch.module.css';
import { CustomFetch } from '../api/customFetch';
import Swal from 'sweetalert2';

interface BranchInterface {
  id: number;
  branchName: string;
  location: string;
}

export const Branch: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [branches, setBranches] = useState<BranchInterface[]>([]);
  const [newBranch, setNewBranch] = useState({
    branchName: '',
    location: '',
  });

  // Fetch branches from the API
  const fetchBranches = async () => {
    try {
      const response = await CustomFetch('http://localhost:3000/api/branch', 'GET');
      if (response) {
        setBranches(response);
      } else {
        throw new Error('Error fetching branches');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire('Error', 'Hubo un error al obtener las sucursales', error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewBranch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: newBranch.branchName,
      location: newBranch.location,
    };

    try {
      const response = await CustomFetch('http://localhost:3000/api/branches', 'POST', data);
      if (response) {
        Swal.fire('Éxito', 'Sucursal agregada correctamente', 'success');
        setBranches((prev) => [...prev, response]); // Actualiza la lista de sucursales
        setNewBranch({
          branchName: '',
          location: '',
        });
        setShowModal(false);
      } else {
        throw new Error('Error al agregar la sucursal');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire('Error', 'Hubo un error al agregar la sucursal', error);
    }
  };

  console.log(branches)

  return (
    <div className={styles.branchListContainer}>
      <h2 className={`${styles.branchListTitle} mb-4`}>Lista de Sucursales</h2>
      <div className={`${styles.branchList} table-responsive`}>
        <table className='table table-hover'>
          <thead className={styles.branchListHeader}>
            <tr>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id} className={styles.branchItem}>
                <td>{branch?.branchName}</td>
                <td>{branch?.location}</td>
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
      <div className={`${styles.branchListFooter} mt-3`}>
        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
          Agregar Sucursal
        </button>
      </div>

      {/* Modal for adding new branch */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Agregar Sucursal</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Nombre
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={newBranch.branchName}
                  onChange={handleInputChange}
                  placeholder= 'Nombre de la sucursal'
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='location' className='form-label'>
                  Ubicación
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='location'
                  name='location'
                  value={newBranch.location}
                  onChange={handleInputChange}
                  placeholder= 'Ubicación de la sucursal'
                  required
                />
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
