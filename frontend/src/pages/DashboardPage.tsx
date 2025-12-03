import { Link } from 'react-router-dom';
import { useAuth } from '../context';

const dashboardCards = [
  {
    title: 'ClickUp Tasks',
    description: 'View and manage your tasks',
    icon: '✅',
    link: '/clickup',
    color: '#7b68ee',
    stats: '12 pending',
  },
  {
    title: 'Inventory',
    description: 'Track lab supplies and equipment',
    icon: '📦',
    link: '/inventory',
    color: '#4caf50',
    stats: '156 items',
  },
  {
    title: 'Orders',
    description: 'Manage purchase orders',
    icon: '🛒',
    link: '/orders',
    color: '#ff9800',
    stats: '5 pending',
  },
  {
    title: 'Reception',
    description: 'Visitor management system',
    icon: '🏢',
    link: '/reception',
    color: '#2196f3',
    stats: '3 visitors today',
  },
  {
    title: 'Reports',
    description: 'View analytics and reports',
    icon: '📈',
    link: '/reports',
    color: '#9c27b0',
    stats: 'Last updated: Today',
  },
  {
    title: 'Search',
    description: 'Global search across all systems',
    icon: '🔍',
    link: '/search',
    color: '#607d8b',
    stats: '',
  },
];

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#1a1a2e' }}>Welcome back, {user?.name}!</h1>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Here&apos;s an overview of your centralized management portal.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {dashboardCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #e0e0e0',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '10px',
                    backgroundColor: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#1a1a2e' }}>{card.title}</h3>
                  <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                    {card.description}
                  </p>
                </div>
              </div>
              {card.stats && (
                <div
                  style={{
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '12px',
                    color: card.color,
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {card.stats}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '20px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            to="/orders/new"
            style={{
              padding: '12px 24px',
              backgroundColor: '#4fc3f7',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'opacity 0.2s',
            }}
          >
            + New Order
          </Link>
          <Link
            to="/reception/checkin"
            style={{
              padding: '12px 24px',
              backgroundColor: '#4caf50',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'opacity 0.2s',
            }}
          >
            + Check In Visitor
          </Link>
          <Link
            to="/inventory/add"
            style={{
              padding: '12px 24px',
              backgroundColor: '#ff9800',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'opacity 0.2s',
            }}
          >
            + Add Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
