import { apiClient } from "./api-client";

export interface User {
  id: string;
  email: string;
  role: "tenant" | "landlord" | "admin";
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
    avatar?: string;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "tenant" | "landlord";
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/login",
      credentials
    );
    return response.data!;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/register",
      data
    );
    return response.data!;
  },

  async logout(): Promise<void> {
    await apiClient.post("/api/auth/logout");
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/api/auth/me");
    return response.data!;
  },
};
