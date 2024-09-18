import { FC, useState } from 'react';
import styles from '../assets/styles/category.module.css';
import { useFetchCategories } from '../hooks/useFetchCategory';
import { CustomFetch } from '../api/customFetch';
import Swal from 'sweetalert2';

interface CategoryInterface {
  id: number;
  name: string;
  description?: string;
}

export const Category: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    branchName: '',
    description: '',
  });

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories();

  if (categoriesLoading) return <p>Loading...</p>;
  if (categoriesError)
    return <p>Error fetching categories: {categoriesError.message}</p>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: newCategory.name,
      description: newCategory.description,
    };

    // Simulate POST request to server
    const response = await CustomFetch('http://localhost:3000/api/category', 'POST', data);
    if (response) {
      Swal.fire('Éxito', 'Categoría agregada correctamente', 'success');
      setNewCategory({
        branchName: '',
        description: '',
      });
    } else {
      Swal.fire('Error', 'Hubo un error al agregar la categoría', 'error');
      setNewCategory({
        branchName: '',
        description: '',
      });
    }
    window.location.reload();
    setShowModal(false);
  };

  return (
    <div className={styles.categoryListContainer}>
      <h2 className={`${styles.categoryListTitle} mb-4`}>
        Lista de Categorías
      </h2>
      <div className={`${styles.categoryList} table-responsive`}>
        <table className='table table-hover'>
          <thead className={styles.categoryListHeader}>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: CategoryInterface) => (
              <tr key={category.id} className={styles.categoryItem}>
                <td>{category.name}</td>
                <td>{category.description}</td>
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
      <div className={`${styles.categoryListFooter} mt-3`}>
        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
          Agregar Categoría
        </button>
      </div>

      {/* Modal for adding new category */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Agregar Categoría</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Nombre de la Categoría
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={newCategory.name}
                  onChange={handleInputChange}
                  placeholder='Ingrese un nombre'
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Descripción de la Categoría
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  name='description'
                  value={newCategory.description}
                  onChange={handleInputChange}
                  placeholder='Ingrese una descripción'
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type='submit' className='btn btn-primary'>
                  Add Category
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
