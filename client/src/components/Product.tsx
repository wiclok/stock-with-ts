import { FC, useState } from "react"
import styles from '../assets/styles/product.module.css'

export const Product: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  })

  // Normally, you'd fetch this data from an API
  const products = [
    { id: 1, name: 'Laptop Pro X', sku: 'LP001', category: 'Electronics', price: 1299.99, stock: 50 },
    { id: 2, name: 'Ergonomic Office Chair', sku: 'OC002', category: 'Furniture', price: 249.99, stock: 30 },
    { id: 3, name: 'Wireless Noise-Canceling Headphones', sku: 'WH003', category: 'Audio', price: 199.99, stock: 100 },
    { id: 4, name: 'Ultra HD 4K Monitor', sku: 'UM004', category: 'Electronics', price: 399.99, stock: 25 },
    { id: 5, name: 'Mechanical Keyboard', sku: 'MK005', category: 'Computer Accessories', price: 129.99, stock: 75 },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new product data to your backend
    console.log('New product submitted:', newProduct)
    // Reset form and close modal
    setNewProduct({ name: '', category: '', price: '', stock: '' })
    setShowModal(false)
  }

  return (
    <div className={styles.productListContainer}>
      <h2 className={`${styles.productListTitle} mb-4`}>Inventario de Productos</h2>
      <div className={`${styles.productList} table-responsive`}>
        <table className="table table-hover">
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
            {products.map((product) => (
              <tr key={product.id} className={styles.productItem}>
                <td>{product.name}</td>
                <td>
                  <img src={`https://via.placeholder.com/200x200`} alt={product.name} className={styles.productImage} />
                </td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <span className={`badge ${product.stock > 50 ? 'bg-success' : product.stock > 20 ? 'bg-warning' : 'bg-danger'}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`${styles.productListFooter} mt-3`}>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New Product</button>
      </div>

      {/* Modal for adding new product */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Add New Product</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Audio">Audio</option>
                  <option value="Computer Accessories">Computer Accessories</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  id="stock"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className="btn btn-primary">Add Product</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

