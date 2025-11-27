import React, { useState } from 'react';
import { ClickUpEmbed } from '../components';

export function ClickUpPage() {
  const [viewUrl, setViewUrl] = useState('');
  const [showConfig, setShowConfig] = useState(true);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfig(false);
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
          <h1 style={{ margin: 0, color: '#1a1a2e' }}>ClickUp Tasks</h1>
          <p style={{ color: '#666', marginTop: '8px' }}>
            View and manage your ClickUp tasks directly from this portal.
          </p>
        </div>
        <button
          onClick={() => setShowConfig(!showConfig)}
          style={{
            padding: '10px 20px',
            backgroundColor: showConfig ? '#e0e0e0' : '#7b68ee',
            color: showConfig ? '#333' : '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          {showConfig ? 'Hide Settings' : '⚙️ Settings'}
        </button>
      </div>

      {showConfig && (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Configure ClickUp View</h3>
          <p style={{ color: '#666', marginBottom: '16px', fontSize: '14px' }}>
            To embed a ClickUp view:
          </p>
          <ol style={{ color: '#666', marginBottom: '20px', fontSize: '14px', paddingLeft: '20px' }}>
            <li>Open your ClickUp List, Board, or View</li>
            <li>Click &quot;Share&quot; in the top right</li>
            <li>Enable &quot;Public sharing&quot; and copy the embeddable link</li>
            <li>Paste the link below</li>
          </ol>
          <form onSubmit={handleSaveUrl} style={{ display: 'flex', gap: '12px' }}>
            <input
              type="url"
              value={viewUrl}
              onChange={(e) => setViewUrl(e.target.value)}
              placeholder="https://sharing.clickup.com/..."
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#7b68ee',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Save & Load
            </button>
          </form>
        </div>
      )}

      <ClickUpEmbed viewUrl={viewUrl} title="My Tasks" height="700px" />
    </div>
  );
}
