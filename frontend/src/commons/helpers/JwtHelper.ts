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
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(tokenKey);
      if (token) {
        const { user_role, role_id } = jwtDecode<AuthUser>(token);
        return { user_role, role_id };
      }
      throw new Error("Token is null");
    }
    throw new Error("localStorage is not available");
  }

  static getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(tokenKey);
    }
    throw new Error("localStorage is not available");
  }

  static deleteToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(tokenKey);
    }
    throw new Error("localStorage is not available");
  }

  static isAuthenticated() {
    if (typeof window !== "undefined") {
      console.log(localStorage.getItem(tokenKey));
      console.log(localStorage.getItem(tokenKey) ? true : false);
      return localStorage.getItem(tokenKey) ? true : false;
    }
    return false;
  }

  static clearToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(tokenKey);
    }
  }
}
