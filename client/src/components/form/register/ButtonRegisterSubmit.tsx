import { FC } from "react";
import styles from "../../../assets/styles/register.module.css";
import Swal from "sweetalert2";
import { CustomFetch } from "../../../api/customFetch";
import useAuth from "../../../hooks/useAuth";

interface ButtonRegisterSubmitProps {
  formData: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      userName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;
}

export const ButtonRegisterSubmit: FC<ButtonRegisterSubmitProps> = ({
  formData,
}) => {

  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {

      const data = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      }

      const response = await CustomFetch('http://localhost:3000/api/auth/register', 'POST', data);
      console.log(response)
      if(response) {
        login(response.token)
        Swal.fire("Éxito", "Has sido registrado correctamente", "success");
      }

    } else {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }
  };

  return (
    <button
      type="submit"
      className={`btn btn-primary ${styles.registerButton}`}
      onClick={handleSubmit}
    >
      Registrarse
    </button>
  );
};
