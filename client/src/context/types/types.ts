export interface AuthState {
  isLogged: boolean;
  token: string | null;
}

export interface AuthContextProps {
  authState: AuthState;
  login: (token: string) => void;
  logout: () => void;
}