import { apiClient } from "./api-client";
import type { IPayment } from "@/lib/models/Payment";

export interface CreatePayment {
  leaseId: string;
  amount: number;
  type: "rent" | "deposit" | "maintenance" | "utility";
  paymentMethod: "cash" | "bank_transfer" | "card" | "mobile_money";
  transactionId?: string;
  notes?: string;
}

export const paymentService = {
  async getAll(filters?: {
    propertyId?: string;
    status?: string;
  }): Promise<IPayment[]> {
    const params = new URLSearchParams();
    if (filters?.propertyId) params.append("propertyId", filters.propertyId);
    if (filters?.status) params.append("status", filters.status);

    const query = params.toString();
    const response = await apiClient.get<IPayment[]>(
      `/api/payments${query ? `?${query}` : ""}`
    );
    return response.data || [];
  },

  async getById(id: string): Promise<IPayment> {
    const response = await apiClient.get<IPayment>(`/api/payments/${id}`);
    return response.data!;
  },

  async create(data: CreatePayment): Promise<IPayment> {
    const response = await apiClient.post<IPayment>("/api/payments", data);
    return response.data!;
  },

  async update(id: string, data: Partial<IPayment>): Promise<IPayment> {
    const response = await apiClient.patch<IPayment>(
      `/api/payments/${id}`,
      data
    );
    return response.data!;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/payments/${id}`);
  },
};
