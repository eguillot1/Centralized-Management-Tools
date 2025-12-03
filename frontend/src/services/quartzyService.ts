import api from './api';
import { InventoryItem, Order, QuartzyResponse } from '../types';

export const quartzyService = {
  // Inventory endpoints
  async getInventory(
    page = 1,
    limit = 20,
    filters?: Record<string, string>
  ): Promise<QuartzyResponse<InventoryItem[]>> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => params.append(key, value));
    }
    const response = await api.get(`/quartzy/inventory?${params.toString()}`);
    return response.data;
  },

  async getInventoryItem(id: string): Promise<QuartzyResponse<InventoryItem>> {
    const response = await api.get(`/quartzy/inventory/${encodeURIComponent(id)}`);
    return response.data;
  },

  async updateInventoryItem(
    id: string,
    data: Partial<InventoryItem>
  ): Promise<QuartzyResponse<InventoryItem>> {
    const response = await api.put(`/quartzy/inventory/${encodeURIComponent(id)}`, data);
    return response.data;
  },

  async createInventoryItem(
    data: Omit<InventoryItem, 'id' | 'lastUpdated'>
  ): Promise<QuartzyResponse<InventoryItem>> {
    const response = await api.post('/quartzy/inventory', data);
    return response.data;
  },

  // Orders endpoints
  async getOrders(
    page = 1,
    limit = 20,
    status?: Order['status']
  ): Promise<QuartzyResponse<Order[]>> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (status) params.append('status', status);
    const response = await api.get(`/quartzy/orders?${params.toString()}`);
    return response.data;
  },

  async getOrder(id: string): Promise<QuartzyResponse<Order>> {
    const response = await api.get(`/quartzy/orders/${encodeURIComponent(id)}`);
    return response.data;
  },

  async createOrder(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<QuartzyResponse<Order>> {
    const response = await api.post('/quartzy/orders', data);
    return response.data;
  },

  async updateOrderStatus(
    id: string,
    status: Order['status'],
    notes?: string
  ): Promise<QuartzyResponse<Order>> {
    const response = await api.patch(`/quartzy/orders/${encodeURIComponent(id)}/status`, { status, notes });
    return response.data;
  },
};
