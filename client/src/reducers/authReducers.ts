import { types } from "../types/user.types.ts";
import { AuthState } from "../context/types/types.ts";

export const authReducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case types.LOGIN:
      const { token } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("isLogged", "true");
      return {
        ...state,
        isLogged: true,
        token,
      };

    case types.LOGOUT:
      localStorage.removeItem("token");
      localStorage.setItem("isLogged", "false");
      return {
        isLogged: false,
        token: null,
      };

    default:
      return state;
  }
};