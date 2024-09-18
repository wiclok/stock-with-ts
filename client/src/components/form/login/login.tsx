import { FC, useState } from "react";
import styles from '../../../assets/styles/register.module.css'
import { ButtonLoginSubmit } from "./ButtonLoginSubmit";

interface LoginProps {
  setActiveTab: (tab: string) => void;
}

export const Login: FC<LoginProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
        <h1 className={styles.registerTitle}>Iniciar Sesión</h1>
        <form>
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
          {/* Pasamos formData y setFormData al botón */}
          <ButtonLoginSubmit formData={formData} setFormData={setFormData} />
        </form>

        <p className={styles.loginLink}>
          ¿No tienes una cuenta?{" "}
          {/* Al hacer clic, cambiamos la pestaña activa a 'Register' */}
          <a href="#" onClick={() => setActiveTab('Register')}>Regístrate</a>
        </p>
      </div>
    </div>
  )
}
