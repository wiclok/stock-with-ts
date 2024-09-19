/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from 'react';
import { CustomFetch } from '../api/customFetch';
import Swal from 'sweetalert2';
import styles from '../assets/styles/branch.module.css';

interface BranchInterface {
  id: number;
  branchName: string;
  location: string;
  managerId: number;
  products: ProductInterface[];
}

interface ProductInterface {
  id: number;
  name: string;
  branchId: number;
  products: ProductInterface[];

}

export const Branch: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [branches, setBranches] = useState<BranchInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [newBranch, setNewBranch] = useState({
    branchName: '',
    location: '',
  });
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchBranches = async () => {
    try {
      const response = await CustomFetch('http://localhost:3000/api/branch', 'GET');
      if (response) {
        setBranches(response);
      } else {
        throw new Error('Error fetching branches');
      }
    } catch (error: any) {
      Swal.fire('Error', 'Hubo un error al obtener las sucursales', error);
    }
  };

  const fetchProducts = async (branchId: number) => {
    setLoadingProducts(true);
    try {
      const response = await CustomFetch(
        `http://localhost:3000/api/product/ProductInBranch/${branchId}`,
        'GET'
      );
      if (response) {
        setProducts(response);
      } else {
        throw new Error('No hay productos en esta sucursal');
      }
    } catch (error: any) {
      console.log(error);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (selectedBranch !== null) {
      fetchProducts(selectedBranch);
    } else {
      setProducts([]);
    }
  }, [selectedBranch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setBranches((prev) => [...prev, response]);
        setNewBranch({
          branchName: '',
          location: '',
        });
        setShowModal(false);
      } else {
        throw new Error('Error al agregar la sucursal');
      }
    } catch (error: any) {
      Swal.fire('Error', 'Hubo un error al agregar la sucursal', error);
    }
  };

  console.log(products[0]?.products)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Sucursales</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id} className={styles.tableRow}>
                <td>{branch.branchName}</td>
                <td>{branch.location}</td>
                <td>
                  <button className={`${styles.button} ${styles.primaryButton}`}>
                    Editar
                  </button>
                  <button className={`${styles.button} ${styles.dangerButton}`}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className={`${styles.button} ${styles.primaryButton} ${styles.addButton}`}
        onClick={() => setShowModal(true)}
      >
        Agregar Sucursal
      </button>

      <div className={styles.productSection}>
        <h3 className={styles.productTitle}>Productos por Sucursal</h3>
        <select
          className={styles.select}
          onChange={(e) => setSelectedBranch(Number(e.target.value))}
          value={selectedBranch || ''}
        >
          <option value="" disabled>
            Seleccionar Sucursal
          </option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.branchName}
            </option>
          ))}
        </select>

        {
          selectedBranch === null? (
            <p>Seleccione una sucursal para ver los productos</p>
          ) : products.length === 0? (
            <p>No hay productos en esta sucursal</p>
          ) : (
            <p>
              Total de productos en la sucursal: {products[0]?.products.length}
            </p>
          )
        }

        {loadingProducts ? (
          <p>Cargando productos...</p>
        ) : (
          <ul className={styles.productList}>
            {selectedBranch && products[0]?.products.length === 0 ? (
              <li>No hay productos en esta sucursal</li>
            ) : (
              products.map((product) => (
                <li key={product.id} className={styles.productItem}>
                  {product.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Agregar Sucursal</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor='name' className={styles.label}>
                  Nombre
                </label>
                <input
                  type='text'
                  className={styles.input}
                  id='name'
                  name='branchName'
                  value={newBranch.branchName}
                  onChange={handleInputChange}
                  placeholder='Nombre de la sucursal'
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor='location' className={styles.label}>
                  Ubicación
                </label>
                <input
                  type='text'
                  className={styles.input}
                  id='location'
                  name='location'
                  value={newBranch.location}
                  onChange={handleInputChange}
                  placeholder='Ubicación de la sucursal'
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type='submit' className={`${styles.button} ${styles.primaryButton}`}>
                  Agregar
                </button>
                <button
                  type='button'
                  className={`${styles.button} ${styles.dangerButton}`}
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
