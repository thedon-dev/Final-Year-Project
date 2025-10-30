import { apiClient } from "./api-client";
import type { IProperty, PropertyType } from "@/lib/models/Property";

export interface CreatePropertyData {
  name: string;
  type: PropertyType;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  };
  amenities: string[];
  images: string[];
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {
  paymentAccount?: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
}

export const propertyService = {
  async getAll(filters?: {
    status?: string;
    city?: string;
  }): Promise<IProperty[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.city) params.append("city", filters.city);

    const query = params.toString();
    const response = await apiClient.get<IProperty[]>(
      `/api/properties${query ? `?${query}` : ""}`
    );
    return response.data || [];
  },

  async getById(id: string): Promise<IProperty> {
    const response = await apiClient.get<IProperty>(`/api/properties/${id}`);
    return response.data!;
  },

  async create(data: CreatePropertyData): Promise<IProperty> {
    const response = await apiClient.post<IProperty>("/api/properties", data);
    return response.data!;
  },

  async update(id: string, data: UpdatePropertyData): Promise<IProperty> {
    const response = await apiClient.patch<IProperty>(
      `/api/properties/${id}`,
      data
    );
    return response.data!;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/properties/${id}`);
  },

  async updatePaymentAccount(
    id: string,
    account: { accountNumber: string; accountName: string; bankName: string }
  ): Promise<IProperty> {
    const response = await apiClient.patch<IProperty>(
      `/api/properties/${id}/payment-account`,
      account
    );
    return response.data!;
  },

  async getQRCode(propertyId: string): Promise<string> {
    const response = await apiClient.get<{ qrCode: string }>(
      `/api/properties/${propertyId}/qr-code`
    );
    return response.data!.qrCode;
  },
};
