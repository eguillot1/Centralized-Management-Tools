import { useState, useEffect } from 'react';
import { InventoryItem } from '../types';
import { quartzyService } from '../services';

export function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      const response = await quartzyService.getInventory(1, 100);
      setItems(response.data);
      setError(null);
    } catch (err) {
      // Demo data for when backend is not available
      setItems([
        {
          id: '1',
          name: 'Pipette Tips 200µL',
          sku: 'PT-200',
          quantity: 5000,
          unit: 'tips',
          category: 'Consumables',
          location: 'Lab A - Shelf 1',
          minQuantity: 1000,
          maxQuantity: 10000,
          lastUpdated: new Date().toISOString(),
          supplier: 'Fisher Scientific',
        },
        {
          id: '2',
          name: 'Nitrile Gloves (M)',
          sku: 'NG-M',
          quantity: 200,
          unit: 'pairs',
          category: 'Safety',
          location: 'Supply Room',
          minQuantity: 50,
          maxQuantity: 500,
          lastUpdated: new Date().toISOString(),
          supplier: 'VWR',
        },
        {
          id: '3',
          name: 'PCR Tubes 0.2mL',
          sku: 'PCR-02',
          quantity: 3000,
          unit: 'tubes',
          category: 'Consumables',
          location: 'Lab B - Freezer',
          minQuantity: 500,
          maxQuantity: 5000,
          lastUpdated: new Date().toISOString(),
          supplier: 'Thermo Fisher',
        },
        {
          id: '4',
          name: 'Ethanol 95%',
          sku: 'ETH-95',
          quantity: 8,
          unit: 'liters',
          category: 'Chemicals',
          location: 'Chemical Storage',
          minQuantity: 5,
          maxQuantity: 20,
          lastUpdated: new Date().toISOString(),
          supplier: 'Sigma-Aldrich',
        },
        {
          id: '5',
          name: 'Centrifuge Tubes 15mL',
          sku: 'CT-15',
          quantity: 150,
          unit: 'tubes',
          category: 'Consumables',
          location: 'Lab A - Shelf 2',
          minQuantity: 200,
          maxQuantity: 1000,
          lastUpdated: new Date().toISOString(),
          supplier: 'Corning',
        },
      ]);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', ...new Set(items.map((item) => item.category))];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = items.filter((item) => item.quantity <= item.minQuantity);

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
          <h1 style={{ margin: 0, color: '#1a1a2e' }}>Inventory Management</h1>
          <p style={{ color: '#666', marginTop: '8px' }}>
            Track and manage lab supplies via Quartzy integration.
          </p>
        </div>
        <button
          onClick={loadInventory}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {lowStockItems.length > 0 && (
        <div
          style={{
            backgroundColor: '#fff3e0',
            border: '1px solid #ff9800',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ margin: 0, color: '#e65100' }}>⚠️ Low Stock Alert</h3>
          <p style={{ margin: '8px 0 0', color: '#e65100' }}>
            {lowStockItems.length} items are below minimum stock levels:{' '}
            {lowStockItems.map((item) => item.name).join(', ')}
          </p>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '300px',
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '150px',
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading inventory...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#e94560' }}>{error}</div>
      ) : (
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
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                  Item
                </th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                  SKU
                </th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                  Category
                </th>
                <th style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>
                  Quantity
                </th>
                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                  Location
                </th>
                <th style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                  }}
                >
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                    {item.supplier && (
                      <div style={{ fontSize: '12px', color: '#666' }}>{item.supplier}</div>
                    )}
                  </td>
                  <td style={{ padding: '16px', color: '#666' }}>{item.sku}</td>
                  <td style={{ padding: '16px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#e3f2fd',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <strong>{item.quantity}</strong> {item.unit}
                  </td>
                  <td style={{ padding: '16px', color: '#666' }}>{item.location}</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    {item.quantity <= item.minQuantity ? (
                      <span
                        style={{
                          padding: '4px 12px',
                          backgroundColor: '#ffebee',
                          color: '#c62828',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}
                      >
                        Low Stock
                      </span>
                    ) : (
                      <span
                        style={{
                          padding: '4px 12px',
                          backgroundColor: '#e8f5e9',
                          color: '#2e7d32',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}
                      >
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
