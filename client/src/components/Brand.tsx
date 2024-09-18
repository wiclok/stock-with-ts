import { FC, useState } from 'react';
import styles from '../assets/styles/brand.module.css';
import { useFetchBrand } from '../hooks/useFetchBrand';
import { CustomFetch } from '../api/customFetch';
import Swal from 'sweetalert2';

interface BrandInterface {
  id: number;
  name: string;
  description?: string;
}

export const Brand: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newBrand, setNewBrand] = useState({
    branchName: '',
    description: '',
  });

  const {
    brands,
    loading: brandsLoading,
    error: brandsError,
  } = useFetchBrand();

  if (brandsLoading) return <p>Loading...</p>;
  if (brandsError) return <p>Error fetching brands: {brandsError.message}</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBrand((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: newBrand.name,
      description: newBrand.description,
    };

    // Simulate POST request to server
    const response = await CustomFetch(
      'http://localhost:3000/api/brand',
      'POST',
      data,
    );
    if (response) {
      Swal.fire('Éxito', 'Marca agregada correctamente', 'success');
      setNewBrand({
        branchName: '',
        description: '',
      });
    } else {
      Swal.fire('Error', 'Hubo un error al agregar la marca', 'error');
      setNewBrand({
        branchName: '',
        description: '',
      });
    }
    window.location.reload();
    setShowModal(false);
  };

  return (
    <div className={styles.brandListContainer}>
      <h2 className={`${styles.brandListTitle} mb-4`}>Lista de Marcas</h2>
      <div className={`${styles.brandList} table-responsive`}>
        <table className='table table-hover'>
          <thead className={styles.brandListHeader}>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand: BrandInterface) => (
              <tr key={brand.id} className={styles.brandItem}>
                <td>{brand.name}</td>
                <td>{brand.description ?? 'No hay descripción'}</td>
                <td>
                  <button className='btn btn-sm btn-outline-primary me-2'>
                    Edit
                  </button>
                  <button className='btn btn-sm btn-outline-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`${styles.brandListFooter} mt-3`}>
        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
          Agregar Marca
        </button>
      </div>

      {/* Modal for adding new brand */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Agregar Marca</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Nombre de la Marca
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={newBrand.name}
                  onChange={handleInputChange}
                  placeholder= 'Nombre de la Marca'
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='description' className='form-label'>
                  Descripción
                </label>
                <input
                  className='form-control'
                  id='description'
                  name='description'
                  value={newBrand.description}
                  onChange={handleInputChange}
                  placeholder= 'Descripción de la Marca'
                ></input>
              </div>
              <div className={styles.modalActions}>
                <button type='submit' className='btn btn-primary'>
                  Add Brand
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
