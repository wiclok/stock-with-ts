/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from './../../../server/src/models/interface/user.interface';
import { useEffect, useState } from "react";
import useAuth from './useAuth';

export const UseUserFetch = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { authState } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/getUserWithToken', {
          method: 'GET',
          headers: {
            'Authorization': `${authState.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (authState.token) {
      fetchUserData();
    }
  }, [authState.token]);

  return { userData, error };
}