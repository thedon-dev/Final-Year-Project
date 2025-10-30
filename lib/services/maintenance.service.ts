import { apiClient } from "./api-client";
import type { IMaintenanceRequest } from "@/lib/models/Maintenance";

export interface CreateMaintenanceRequest {
  propertyId: string;
  unitId?: string;
  title: string;
  description: string;
  category:
    | "plumbing"
    | "electrical"
    | "hvac"
    | "appliance"
    | "structural"
    | "other";
  priority: "low" | "medium" | "high" | "urgent";
  images?: string[];
}

export interface UpdateMaintenanceRequest {
  status?: "pending" | "in_progress" | "completed" | "cancelled";
  notes?: string;
  assignedTo?: string;
}

export const maintenanceService = {
  async getAll(filters?: {
    propertyId?: string;
    status?: string;
  }): Promise<IMaintenanceRequest[]> {
    const params = new URLSearchParams();
    if (filters?.propertyId) params.append("propertyId", filters.propertyId);
    if (filters?.status) params.append("status", filters.status);

    const query = params.toString();
    const response = await apiClient.get<IMaintenanceRequest[]>(
      `/api/maintenance${query ? `?${query}` : ""}`
    );
    return response.data || [];
  },

  async getById(id: string): Promise<IMaintenanceRequest> {
    const response = await apiClient.get<IMaintenanceRequest>(
      `/api/maintenance/${id}`
    );
    return response.data!;
  },

  async create(data: CreateMaintenanceRequest): Promise<IMaintenanceRequest> {
    const response = await apiClient.post<IMaintenanceRequest>(
      "/api/maintenance",
      data
    );
    return response.data!;
  },

  async update(
    id: string,
    data: UpdateMaintenanceRequest
  ): Promise<IMaintenanceRequest> {
    const response = await apiClient.patch<IMaintenanceRequest>(
      `/api/maintenance/${id}`,
      data
    );
    return response.data!;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/maintenance/${id}`);
  },
};
