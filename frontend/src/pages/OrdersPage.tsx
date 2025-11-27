import { useState, useEffect } from 'react';
import { Order } from '../types';
import { quartzyService } from '../services';

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<Order['status'] | 'all'>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await quartzyService.getOrders(1, 100);
      setOrders(response.data);
    } catch {
      // Demo data for when backend is not available
      setOrders([
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          status: 'pending',
          items: [
            { id: '1', inventoryItemId: '1', name: 'Pipette Tips 200µL', quantity: 10, unitPrice: 25, totalPrice: 250 },
          ],
          totalAmount: 250,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          requestedBy: 'John Doe',
          vendor: 'Fisher Scientific',
          notes: 'Urgent - running low on stock',
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          status: 'approved',
          items: [
            { id: '2', inventoryItemId: '2', name: 'Nitrile Gloves (M)', quantity: 20, unitPrice: 15, totalPrice: 300 },
            { id: '3', inventoryItemId: '3', name: 'Lab Coats', quantity: 5, unitPrice: 45, totalPrice: 225 },
          ],
          totalAmount: 525,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date().toISOString(),
          requestedBy: 'Jane Smith',
          approvedBy: 'Admin User',
          vendor: 'VWR',
        },
        {
          id: '3',
          orderNumber: 'ORD-2024-003',
          status: 'shipped',
          items: [
            { id: '4', inventoryItemId: '4', name: 'PCR Tubes 0.2mL', quantity: 50, unitPrice: 12, totalPrice: 600 },
          ],
          totalAmount: 600,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date().toISOString(),
          requestedBy: 'Mike Johnson',
          approvedBy: 'Admin User',
          vendor: 'Thermo Fisher',
        },
        {
          id: '4',
          orderNumber: 'ORD-2024-004',
          status: 'delivered',
          items: [
            { id: '5', inventoryItemId: '5', name: 'Ethanol 95%', quantity: 10, unitPrice: 35, totalPrice: 350 },
          ],
          totalAmount: 350,
          createdAt: new Date(Date.now() - 604800000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          requestedBy: 'Sarah Williams',
          approvedBy: 'Admin User',
          vendor: 'Sigma-Aldrich',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: { bg: '#fff3e0', text: '#e65100' },
      approved: { bg: '#e3f2fd', text: '#1565c0' },
      ordered: { bg: '#f3e5f5', text: '#7b1fa2' },
      shipped: { bg: '#e8f5e9', text: '#2e7d32' },
      delivered: { bg: '#e8f5e9', text: '#1b5e20' },
      cancelled: { bg: '#ffebee', text: '#c62828' },
    };
    return colors[status];
  };

  const filteredOrders = orders.filter(
    (order) => selectedStatus === 'all' || order.status === selectedStatus
  );

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
          <h1 style={{ margin: 0, color: '#1a1a2e' }}>Order Management</h1>
          <p style={{ color: '#666', marginTop: '8px' }}>
            Track and manage purchase orders.
          </p>
        </div>
        <button
          style={{
            padding: '12px 24px',
            backgroundColor: '#4fc3f7',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          + New Order
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        {(['all', 'pending', 'approved', 'shipped', 'delivered'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedStatus === status ? '#1a1a2e' : '#f5f5f5',
              color: selectedStatus === status ? '#fff' : '#333',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && statusCounts[status] && ` (${statusCounts[status]})`}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gap: '16px',
          }}
        >
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #e0e0e0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <h3 style={{ margin: 0, color: '#1a1a2e' }}>{order.orderNumber}</h3>
                  <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                    Requested by {order.requestedBy} • {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  style={{
                    padding: '6px 16px',
                    backgroundColor: getStatusColor(order.status).bg,
                    color: getStatusColor(order.status).text,
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                  }}
                >
                  {order.status}
                </span>
              </div>

              <div
                style={{
                  borderTop: '1px solid #f0f0f0',
                  borderBottom: '1px solid #f0f0f0',
                  padding: '12px 0',
                  margin: '12px 0',
                }}
              >
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: '500' }}>{item.name}</span>
                      <span style={{ color: '#666', marginLeft: '8px' }}>x{item.quantity}</span>
                    </div>
                    <span style={{ fontWeight: '500' }}>${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {order.vendor && <span>Vendor: {order.vendor}</span>}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a2e' }}>
                  Total: ${order.totalAmount.toFixed(2)}
                </div>
              </div>

              {order.notes && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '4px',
                    fontSize: '14px',
                    color: '#666',
                  }}
                >
                  <strong>Notes:</strong> {order.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
