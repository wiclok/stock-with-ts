import { useEffect, useState } from "react";
import { CustomFetch } from "../api/customFetch";

interface Brand {
  id: number;
  name: string;
}

interface FetchError {
  message: string;
}

export const useFetchBrand = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<FetchError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await CustomFetch(
          'http://localhost:3000/api/brand',
          'GET',
        );
        setBrands(response);
      } catch (err) {
        if (err instanceof Error) {
          setError({ message: err.message });
        } else {
          setError({ message: 'An unknown error occurred' });
        }
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return { brands, error, loading };
};
