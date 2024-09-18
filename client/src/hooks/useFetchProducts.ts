import { useEffect, useState } from "react";
import { CustomFetch } from "../api/customFetch";

// Define un tipo para el error si es necesario
type FetchError = {
  message: string;
};

export const useFetchAllProducts = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]); // Usa `any[]` o define un tipo de producto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null); // Define el tipo del error

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await CustomFetch(
          'http://localhost:3000/api/product',
          'GET',
        );
        setProducts(response);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message }); // Asegúrate de manejar el tipo Error
        } else {
          setError({ message: 'An unknown error occurred' });
        }
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading, error };
};
