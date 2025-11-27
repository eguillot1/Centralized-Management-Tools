import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// In-memory notification storage
const notifications: Notification[] = [];

export const notificationService = {
  async getNotifications(userId: string, unreadOnly = false): Promise<Notification[]> {
    let userNotifications = notifications.filter((n) => n.userId === userId);
    
    if (unreadOnly) {
      userNotifications = userNotifications.filter((n) => !n.read);
    }
    
    return userNotifications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async createNotification(
    data: Omit<Notification, 'id' | 'createdAt' | 'read'>
  ): Promise<Notification> {
    const notification: Notification = {
      ...data,
      id: uuidv4(),
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    notifications.unshift(notification);
    
    // Keep only last 100 notifications per user
    const userNotifications = notifications.filter((n) => n.userId === data.userId);
    if (userNotifications.length > 100) {
      const toRemove = userNotifications.slice(100);
      for (const n of toRemove) {
        const index = notifications.indexOf(n);
        if (index > -1) {
          notifications.splice(index, 1);
        }
      }
    }
    
    return notification;
  },

  async markAsRead(id: string, userId: string): Promise<void> {
    const notification = notifications.find((n) => n.id === id && n.userId === userId);
    if (notification) {
      notification.read = true;
    }
  },

  async markAllAsRead(userId: string): Promise<void> {
    notifications
      .filter((n) => n.userId === userId)
      .forEach((n) => {
        n.read = true;
      });
  },

  async deleteNotification(id: string, userId: string): Promise<void> {
    const index = notifications.findIndex((n) => n.id === id && n.userId === userId);
    if (index > -1) {
      notifications.splice(index, 1);
    }
  },
};
