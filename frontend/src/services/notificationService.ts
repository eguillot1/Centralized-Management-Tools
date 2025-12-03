import api from './api';
import { Notification, SearchResult } from '../types';

export const notificationService = {
  async getNotifications(unreadOnly = false): Promise<Notification[]> {
    const response = await api.get('/notifications', { params: { unreadOnly } });
    return response.data;
  },

  async markAsRead(id: string): Promise<void> {
    await api.patch(`/notifications/${encodeURIComponent(id)}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await api.patch('/notifications/read-all');
  },

  async deleteNotification(id: string): Promise<void> {
    await api.delete(`/notifications/${encodeURIComponent(id)}`);
  },
};

export const searchService = {
  async search(query: string, types?: string[]): Promise<SearchResult[]> {
    const params = new URLSearchParams({ q: query });
    if (types && types.length > 0) {
      params.append('types', types.join(','));
    }
    const response = await api.get(`/search?${params.toString()}`);
    return response.data;
  },
};
