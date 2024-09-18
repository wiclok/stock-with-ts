import { useEffect, useState } from "react";
import { CustomFetch } from "../api/customFetch";

interface Category {
  id: number;
  name: string;
}

interface FetchError {
  message: string;
}

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<FetchError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CustomFetch(
          'http://localhost:3000/api/category',
          'GET',
        );
        setCategories(response);
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
    fetchCategories();
  }, []);

  return { categories, error, loading };
};
