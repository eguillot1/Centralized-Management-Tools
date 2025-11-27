import { useState } from 'react';
import { Notification } from '../types';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Centrifuge Tubes 15mL are below minimum stock level.',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      link: '/inventory',
    },
    {
      id: '2',
      type: 'success',
      title: 'Order Delivered',
      message: 'Order ORD-2024-004 has been delivered successfully.',
      read: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      link: '/orders',
    },
    {
      id: '3',
      type: 'info',
      title: 'New Visitor',
      message: 'Robert Chen has checked in to visit Dr. Sarah Williams.',
      read: true,
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      link: '/reception',
    },
    {
      id: '4',
      type: 'error',
      title: 'Order Cancelled',
      message: 'Order ORD-2024-005 has been cancelled by the vendor.',
      read: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      link: '/orders',
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeIcon = (type: Notification['type']) => {
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
      success: '✅',
    };
    return icons[type];
  };

  const getTypeColor = (type: Notification['type']) => {
    const colors = {
      info: { bg: '#e3f2fd', border: '#2196f3' },
      warning: { bg: '#fff3e0', border: '#ff9800' },
      error: { bg: '#ffebee', border: '#f44336' },
      success: { bg: '#e8f5e9', border: '#4caf50' },
    };
    return colors[type];
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: '#1a1a2e' }}>Notifications</h1>
          <p style={{ color: '#666', marginTop: '8px' }}>
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f5f5f5',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
          <h3 style={{ margin: '0 0 8px', color: '#1a1a2e' }}>No Notifications</h3>
          <p style={{ margin: 0, color: '#666' }}>You&apos;re all caught up!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((notification) => {
            const colors = getTypeColor(notification.type);
            return (
              <div
                key={notification.id}
                style={{
                  backgroundColor: notification.read ? '#ffffff' : colors.bg,
                  borderRadius: '8px',
                  padding: '16px 20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  borderLeft: `4px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  opacity: notification.read ? 0.8 : 1,
                }}
              >
                <div style={{ fontSize: '24px' }}>{getTypeIcon(notification.type)}</div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: '#1a1a2e',
                        fontSize: '16px',
                        fontWeight: notification.read ? '500' : '600',
                      }}
                    >
                      {notification.title}
                      {!notification.read && (
                        <span
                          style={{
                            marginLeft: '8px',
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#4fc3f7',
                            borderRadius: '50%',
                            display: 'inline-block',
                          }}
                        />
                      )}
                    </h3>
                    <span style={{ color: '#999', fontSize: '12px' }}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ margin: '8px 0 0', color: '#666', fontSize: '14px' }}>
                    {notification.message}
                  </p>
                  <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                    {notification.link && (
                      <a
                        href={notification.link}
                        style={{
                          color: '#4fc3f7',
                          fontSize: '13px',
                          textDecoration: 'none',
                        }}
                      >
                        View Details →
                      </a>
                    )}
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#666',
                          fontSize: '13px',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#999',
                        fontSize: '13px',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
