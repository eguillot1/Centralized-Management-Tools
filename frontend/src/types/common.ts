export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface SearchResult {
  id: string;
  type: 'inventory' | 'order' | 'task' | 'visitor';
  title: string;
  description: string;
  link: string;
  relevance: number;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  userName: string;
  timestamp: string;
  details: Record<string, unknown>;
  ipAddress?: string;
}

export interface Report {
  id: string;
  name: string;
  type: 'inventory' | 'orders' | 'visitors' | 'tasks' | 'custom';
  description: string;
  createdAt: string;
  updatedAt: string;
  schedule?: string;
  filters?: Record<string, unknown>;
}
