import { useEffect, useState } from "react";
import { CustomFetch } from "../api/customFetch";

interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  roleId: number;
}

interface FetchError {
  message: string;
}

export const useFetchUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<FetchError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await CustomFetch(
          'http://localhost:3000/api/user',
          'GET',
        );
        setUsers(response);
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
    fetchUsers();
  }, []);

  return { users, error, loading };
};
