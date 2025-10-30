import { toast } from "sonner";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to login on unauthorized
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        throw new Error(data.error?.message || "An error occurred");
      }

      return data;
    } catch (error: any) {
      console.error("[API Error]:", error);
      toast.error(error.message || "Something went wrong");
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
