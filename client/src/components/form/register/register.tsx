import { FC, useState } from 'react';
import styles from '../../../assets/styles/register.module.css';
import { ButtonRegisterSubmit } from './ButtonRegisterSubmit';

interface RegisterProps {
  setActiveTab: (tab: string) => void;
}

export const Register: FC<RegisterProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h1 className={styles.registerTitle}>Crear Cuenta</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <ButtonRegisterSubmit formData={formData} setFormData={setFormData} />
        </form>

        <p className={styles.loginLink} onClick={()=> setActiveTab('Login')}>
          ¿Ya tienes una cuenta? <a>Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
}
