import { useState } from 'react';

interface ReportConfig {
  id: string;
  name: string;
  description: string;
  type: 'inventory' | 'orders' | 'visitors' | 'custom';
  icon: string;
}

const reportTemplates: ReportConfig[] = [
  {
    id: 'inventory-summary',
    name: 'Inventory Summary',
    description: 'Overview of all inventory items, stock levels, and reorder alerts',
    type: 'inventory',
    icon: '📦',
  },
  {
    id: 'low-stock',
    name: 'Low Stock Report',
    description: 'Items below minimum stock thresholds',
    type: 'inventory',
    icon: '⚠️',
  },
  {
    id: 'order-history',
    name: 'Order History',
    description: 'Complete history of all purchase orders',
    type: 'orders',
    icon: '🛒',
  },
  {
    id: 'pending-orders',
    name: 'Pending Orders',
    description: 'Orders awaiting approval or fulfillment',
    type: 'orders',
    icon: '⏳',
  },
  {
    id: 'visitor-log',
    name: 'Visitor Log',
    description: 'Complete visitor check-in/check-out records',
    type: 'visitors',
    icon: '🏢',
  },
  {
    id: 'daily-visitors',
    name: 'Daily Visitor Report',
    description: 'Summary of visitors by day',
    type: 'visitors',
    icon: '📅',
  },
];

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportConfig | null>(null);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<boolean>(false);

  const handleGenerateReport = async () => {
    if (!selectedReport) return;
    setIsGenerating(true);
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGenerating(false);
    setGeneratedReport(true);
  };

  const getTypeColor = (type: ReportConfig['type']) => {
    const colors = {
      inventory: '#4caf50',
      orders: '#ff9800',
      visitors: '#2196f3',
      custom: '#9c27b0',
    };
    return colors[type];
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, color: '#1a1a2e' }}>Reports</h1>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Generate and download reports for inventory, orders, and visitors.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '16px', fontSize: '18px' }}>
            Select Report Template
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reportTemplates.map((report) => (
              <div
                key={report.id}
                onClick={() => {
                  setSelectedReport(report);
                  setGeneratedReport(false);
                }}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  border:
                    selectedReport?.id === report.id
                      ? `2px solid ${getTypeColor(report.type)}`
                      : '2px solid transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'border-color 0.2s',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: getTypeColor(report.type),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}
                >
                  {report.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '15px', color: '#1a1a2e' }}>
                    {report.name}
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>
                    {report.description}
                  </p>
                </div>
                <span
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '12px',
                    fontSize: '11px',
                    color: '#666',
                    textTransform: 'capitalize',
                  }}
                >
                  {report.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '16px', fontSize: '18px' }}>
            Report Options
          </h2>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            {!selectedReport ? (
              <p style={{ color: '#666', textAlign: 'center', margin: 0 }}>
                Select a report template to continue
              </p>
            ) : (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '16px', color: '#1a1a2e' }}>
                    {selectedReport.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    {selectedReport.description}
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      fontSize: '14px',
                    }}
                  >
                    Date Range
                  </label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange((prev) => ({ ...prev, start: e.target.value }))
                      }
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                      }}
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange((prev) => ({ ...prev, end: e.target.value }))
                      }
                      style={{
                        flex: 1,
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: isGenerating ? '#ccc' : '#4fc3f7',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    marginBottom: '12px',
                  }}
                >
                  {isGenerating ? 'Generating...' : 'Generate Report'}
                </button>

                {generatedReport && (
                  <div
                    style={{
                      padding: '16px',
                      backgroundColor: '#e8f5e9',
                      borderRadius: '6px',
                      marginTop: '16px',
                    }}
                  >
                    <h4 style={{ margin: '0 0 8px', color: '#2e7d32' }}>
                      ✅ Report Generated
                    </h4>
                    <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#333' }}>
                      Your {selectedReport.name} is ready.
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#2e7d32',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        📥 Download PDF
                      </button>
                      <button
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#fff',
                          color: '#2e7d32',
                          border: '1px solid #2e7d32',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        📊 Download CSV
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '20px',
              marginTop: '16px',
            }}
          >
            <h3 style={{ margin: '0 0 12px', fontSize: '14px', color: '#666' }}>
              Scheduled Reports
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#999' }}>
              Set up automatic report generation on a daily, weekly, or monthly schedule.
              Coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
