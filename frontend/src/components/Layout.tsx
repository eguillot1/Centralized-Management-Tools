import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/clickup', label: 'ClickUp Tasks', icon: '✅' },
  { path: '/inventory', label: 'Inventory', icon: '📦' },
  { path: '/orders', label: 'Orders', icon: '🛒' },
  { path: '/reception', label: 'Reception', icon: '🏢' },
  { path: '/reports', label: 'Reports', icon: '📈' },
  { path: '/search', label: 'Search', icon: '🔍' },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}
      style={{
        width: isOpen ? '250px' : '60px',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
        transition: 'width 0.3s ease',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'space-between' : 'center',
          borderBottom: '1px solid #16213e',
        }}
      >
        {isOpen && <h2 style={{ margin: 0, fontSize: '18px' }}>CMP</h2>}
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '20px',
          }}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      <nav style={{ flex: 1, padding: '20px 0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 20px',
                  color: location.pathname === item.path ? '#4fc3f7' : '#ffffff',
                  textDecoration: 'none',
                  backgroundColor:
                    location.pathname === item.path ? '#16213e' : 'transparent',
                  borderLeft:
                    location.pathname === item.path
                      ? '3px solid #4fc3f7'
                      : '3px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: '20px', marginRight: isOpen ? '12px' : '0' }}>
                  {item.icon}
                </span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        style={{
          padding: '20px',
          borderTop: '1px solid #16213e',
        }}
      >
        {isOpen && user && (
          <div style={{ marginBottom: '10px', fontSize: '14px' }}>
            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
            <div style={{ color: '#888', fontSize: '12px' }}>{user.email}</div>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#e94560',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isOpen ? 'Logout' : '🚪'}
        </button>
      </div>
    </aside>
  );
}

export function Header() {
  const { user } = useAuth();
  const [notificationCount] = useState(3);

  return (
    <header
      style={{
        height: '60px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 999,
      }}
    >
      <h1 style={{ margin: 0, fontSize: '20px', color: '#1a1a2e' }}>
        Centralized Management Portal
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link
          to="/search"
          style={{
            padding: '8px 16px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #e0e0e0',
            borderRadius: '20px',
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          🔍 Search...
        </Link>

        <Link
          to="/notifications"
          style={{
            position: 'relative',
            fontSize: '24px',
            textDecoration: 'none',
          }}
        >
          🔔
          {notificationCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#e94560',
                color: '#ffffff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {notificationCount}
            </span>
          )}
        </Link>

        {user && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#4fc3f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
