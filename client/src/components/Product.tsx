import { FC, useState } from 'react';
import styles from '../assets/styles/product.module.css';
import { useFetchAllProducts } from '../hooks/useFetchProducts';
import { useFetchCategories } from '../hooks/useFetchCategory';
import { useFetchBrand } from '../hooks/useFetchBrand';
import { CustomFetch } from '../api/customFetch';
import Swal from 'sweetalert2';

interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  brandId: number;
  Category: {
    name: string;
  };
}

export const Product: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    branchName: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
    brandId: '',
  });

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useFetchAllProducts();
  const {
    categories: brand,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories();
  const {
    brands,
    loading: brandsLoading,
    error: brandsError,
  } = useFetchBrand();

  if (productsLoading || categoriesLoading || brandsLoading)
    return <p>Loading...</p>;
  if (productsError)
    return <p>Error fetching products: {productsError.message}</p>;
  if (categoriesError)
    return <p>Error fetching categories: {categoriesError.message}</p>;
  if (brandsError) return <p>Error fetching brands: {brandsError.message}</p>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      imageUrl: newProduct.imageUrl,
      categoryId: parseInt(newProduct.categoryId),
      brandId: parseInt(newProduct.brandId),
    }
    // Simulate POST request to server
    const response = await CustomFetch('http://localhost:3000/api/product', 'POST', data);
    if (response) {
      Swal.fire('Éxito', 'Producto agregado correctamente','success');
      setNewProduct({
        branchName: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        categoryId: '',
        brandId: '',
      });
    } else {
      Swal.fire('Error', 'Hubo un error al agregar el producto','error');
      setNewProduct({
        branchName: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        categoryId: '',
        brandId: '',
      });
    }
    window.location.reload();
    setShowModal(false);
  };

  return (
    <div className={styles.productListContainer}>
      <h2 className={`${styles.productListTitle} mb-4`}>
        Inventario de Productos
      </h2>
      <div className={`${styles.productList} table-responsive`}>
        <table className='table table-hover'>
          <thead className={styles.productListHeader}>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductInterface) => (
              <tr key={product.id} className={styles.productItem}>
                <td>{product.name}</td>
                <td>
                  <img
                    src={
                      product.imageUrl || 'https://via.placeholder.com/200x200'
                    }
                    alt={product.name}
                    className={styles.productImage}
                  />
                </td>
                <td>{product.Category.name}</td>
                <td>${product.price}</td>
                <td>
                  <span
                    className={`badge ${
                      product.stock > 50
                        ? 'bg-success'
                        : product.stock > 20
                        ? 'bg-warning'
                        : 'bg-danger'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
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
      <div className={`${styles.productListFooter} mt-3`}>
        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
          Agregar Producto
        </button>
      </div>

      {/* Modal for adding new product */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Agregar Producto</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Nombre del Producto
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='description' className='form-label'>
                  Descripción
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  name='description'
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='categoryId' className='form-label'>
                  Categoría
                </label>
                <select
                  className='form-select'
                  id='categoryId'
                  name='categoryId'
                  value={newProduct.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value='' disabled>
                    Seleccione la categoría
                  </option>
                  {brand.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <label htmlFor='brandId' className='form-label'>
                  Marca
                </label>
                <select
                  className='form-select'
                  id='brandId'
                  name='brandId'
                  value={newProduct.brandId}
                  onChange={handleInputChange}
                  required
                >
                  <option value='' disabled>
                    Seleccione la Marca
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-3'>
                <label htmlFor='price' className='form-label'>
                  Precio
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='price'
                  name='price'
                  value={newProduct.price}
                  onChange={handleInputChange}
                  min='0'
                  step='0.01'
                  required
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='stock' className='form-label'>
                  Stock
                </label>
                <input
                  type='number'
                  className='form-control'
                  id='stock'
                  name='stock'
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  min='0'
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type='submit' className='btn btn-primary'>
                  Add Product
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
