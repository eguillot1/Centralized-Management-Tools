import { v4 as uuidv4 } from 'uuid';

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

// In-memory audit log storage (use a database in production)
const auditLogs: AuditLog[] = [];

export const auditService = {
  async log(entry: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const log: AuditLog = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    
    auditLogs.unshift(log);
    
    // Keep only last 1000 logs in memory
    if (auditLogs.length > 1000) {
      auditLogs.pop();
    }
    
    console.log(`[AUDIT] ${log.action} - ${log.entityType}:${log.entityId} by ${log.userName}`);
    
    return log;
  },

  async getLogs(options: {
    page?: number;
    limit?: number;
    entityType?: string;
    userId?: string;
  }): Promise<{ data: AuditLog[]; pagination: { page: number; limit: number; total: number } }> {
    const { page = 1, limit = 50, entityType, userId } = options;
    
    let filtered = auditLogs;
    
    if (entityType) {
      filtered = filtered.filter((log) => log.entityType === entityType);
    }
    
    if (userId) {
      filtered = filtered.filter((log) => log.userId === userId);
    }
    
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    
    return {
      data,
      pagination: { page, limit, total },
    };
  },
};
