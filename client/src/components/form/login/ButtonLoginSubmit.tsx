import { FC } from "react";
import styles from "../../../assets/styles/register.module.css";
import Swal from "sweetalert2";
import { CustomFetch } from "../../../api/customFetch";
import useAuth from "../../../hooks/useAuth";

interface ButtonLoginSubmitProps {
  formData: {
    email: string;
    password: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      email: string;
      password: string;
    }>
  >;
}

export const ButtonLoginSubmit: FC<ButtonLoginSubmitProps> = ({
  formData,
}) => {

  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      const data = {
        email: formData.email,
        password: formData.password,
      }

      const response = await CustomFetch('http://localhost:3000/api/auth/login', 'POST', data);
      console.log(response)
      if(response) {
        login(response.token)
        Swal.fire("Éxito", "Has iniciado sesión correctamente", "success");
      }

  };

  return (
    <button
      type="submit"
      className={`btn btn-primary ${styles.registerButton}`}
      onClick={handleSubmit}
    >
      Iniciar Sesión
    </button>
  );
};
