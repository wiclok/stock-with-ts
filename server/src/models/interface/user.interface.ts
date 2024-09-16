export interface User {
  id?: number;
  userName: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}
