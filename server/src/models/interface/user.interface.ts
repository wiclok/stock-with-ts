export interface User {
  id?: number;
  userName: string;
  email: string;
  password: string;
  roleId?: number;
  state: boolean
}
