import { jwtDecode } from "jwt-decode";

const tokenKey = "auth-token";

interface AuthUser {
  user_id: string;
  user_name: string;
  email: string;
  role_id: number;
  user_role: string | undefined;
}

export default class JWTHelper {
  static getRole() {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      const { user_role, role_id } = jwtDecode<AuthUser>(token);
      return { user_role, role_id };
    }
    throw new Error("Token is null");
  }
  static getToken() {
    return localStorage.getItem(tokenKey);
  }
  static isAuthenticated() {
    console.log(localStorage.getItem(tokenKey));
    console.log(localStorage.getItem(tokenKey) ? true : false);

    return localStorage.getItem(tokenKey) ? true : false;
  }
}
