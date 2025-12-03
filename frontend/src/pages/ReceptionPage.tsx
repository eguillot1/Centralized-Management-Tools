import React, { useState } from 'react';

interface Visitor {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  host: string;
  purpose: string;
  checkInTime: string;
  checkOutTime?: string;
  badge?: string;
}

export function ReceptionPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: '1',
      name: 'Robert Chen',
      company: 'ABC Corp',
      email: 'robert@abc.com',
      phone: '555-0101',
      host: 'Dr. Sarah Williams',
      purpose: 'Lab Tour',
      checkInTime: new Date(Date.now() - 3600000).toISOString(),
      badge: 'V-001',
    },
    {
      id: '2',
      name: 'Emily Davis',
      company: 'XYZ Labs',
      email: 'emily@xyz.com',
      phone: '555-0102',
      host: 'John Smith',
      purpose: 'Meeting',
      checkInTime: new Date(Date.now() - 7200000).toISOString(),
      badge: 'V-002',
    },
    {
      id: '3',
      name: 'Michael Brown',
      company: 'Tech Solutions',
      email: 'michael@tech.com',
      phone: '555-0103',
      host: 'Jane Doe',
      purpose: 'Equipment Demo',
      checkInTime: new Date(Date.now() - 86400000).toISOString(),
      checkOutTime: new Date(Date.now() - 82800000).toISOString(),
      badge: 'V-003',
    },
  ]);

  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [newVisitor, setNewVisitor] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    host: '',
    purpose: '',
  });

  const activeVisitors = visitors.filter((v) => !v.checkOutTime);
  const pastVisitors = visitors.filter((v) => v.checkOutTime);

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const visitor: Visitor = {
      ...newVisitor,
      id: Date.now().toString(),
      checkInTime: new Date().toISOString(),
      badge: `V-${String(visitors.length + 1).padStart(3, '0')}`,
    };
    setVisitors([visitor, ...visitors]);
    setNewVisitor({
      name: '',
      company: '',
      email: '',
      phone: '',
      host: '',
      purpose: '',
    });
    setShowCheckInForm(false);
  };

  const handleCheckOut = (id: string) => {
    setVisitors(
      visitors.map((v) =>
        v.id === id ? { ...v, checkOutTime: new Date().toISOString() } : v
      )
    );
  };

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
          <h1 style={{ margin: 0, color: '#1a1a2e' }}>Reception</h1>
          <p style={{ color: '#666', marginTop: '8px' }}>
            Visitor check-in and management system.
          </p>
        </div>
        <button
          onClick={() => setShowCheckInForm(!showCheckInForm)}
          style={{
            padding: '12px 24px',
            backgroundColor: showCheckInForm ? '#e0e0e0' : '#4caf50',
            color: showCheckInForm ? '#333' : '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          {showCheckInForm ? 'Cancel' : '+ Check In Visitor'}
        </button>
      </div>

      {showCheckInForm && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Visitor Check-In</h3>
          <form onSubmit={handleCheckIn}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
              }}
            >
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newVisitor.name}
                  onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Company
                </label>
                <input
                  type="text"
                  value={newVisitor.company}
                  onChange={(e) => setNewVisitor({ ...newVisitor, company: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={newVisitor.email}
                  onChange={(e) => setNewVisitor({ ...newVisitor, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  value={newVisitor.phone}
                  onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Host *
                </label>
                <input
                  type="text"
                  required
                  value={newVisitor.host}
                  onChange={(e) => setNewVisitor({ ...newVisitor, host: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Purpose *
                </label>
                <select
                  required
                  value={newVisitor.purpose}
                  onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select purpose</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Lab Tour">Lab Tour</option>
                  <option value="Interview">Interview</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Equipment Demo">Equipment Demo</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Check In
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: '#1a1a2e', marginBottom: '16px' }}>
          Currently On-Site ({activeVisitors.length})
        </h2>
        {activeVisitors.length === 0 ? (
          <div
            style={{
              backgroundColor: '#f5f5f5',
              padding: '40px',
              borderRadius: '8px',
              textAlign: 'center',
              color: '#666',
            }}
          >
            No visitors currently on-site.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {activeVisitors.map((visitor) => (
              <div
                key={visitor.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border: '2px solid #4caf50',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0 }}>{visitor.name}</h3>
                    {visitor.company && (
                      <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                        {visitor.company}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      padding: '4px 12px',
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}
                  >
                    {visitor.badge}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Host:</strong> {visitor.host}
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Purpose:</strong> {visitor.purpose}
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Check-in:</strong>{' '}
                    {new Date(visitor.checkInTime).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => handleCheckOut(visitor.id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#ff9800',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Check Out
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 style={{ color: '#1a1a2e', marginBottom: '16px' }}>Recent Visitors</h2>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '16px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Company</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Host</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Check-in</th>
                <th style={{ padding: '16px', textAlign: 'left' }}>Check-out</th>
              </tr>
            </thead>
            <tbody>
              {pastVisitors.map((visitor) => (
                <tr key={visitor.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '16px' }}>{visitor.name}</td>
                  <td style={{ padding: '16px', color: '#666' }}>{visitor.company || '-'}</td>
                  <td style={{ padding: '16px' }}>{visitor.host}</td>
                  <td style={{ padding: '16px', color: '#666' }}>
                    {new Date(visitor.checkInTime).toLocaleString()}
                  </td>
                  <td style={{ padding: '16px', color: '#666' }}>
                    {visitor.checkOutTime
                      ? new Date(visitor.checkOutTime).toLocaleString()
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
