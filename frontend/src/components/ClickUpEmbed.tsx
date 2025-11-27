interface ClickUpEmbedProps {
  viewUrl: string;
  title?: string;
  height?: string;
}

export function ClickUpEmbed({ viewUrl, title = 'ClickUp Tasks', height = '600px' }: ClickUpEmbedProps) {
  // ClickUp allows embedding views via iframe
  // The URL should be from ClickUp's share feature
  // Properly validate URL to ensure it's actually a ClickUp domain
  const isValidClickUpUrl = (() => {
    try {
      const url = new URL(viewUrl);
      const hostname = url.hostname.toLowerCase();
      // Check that the hostname ends with clickup.com (prevents subdomain attacks)
      return hostname === 'clickup.com' || 
             hostname === 'app.clickup.com' || 
             hostname === 'sharing.clickup.com' ||
             hostname.endsWith('.clickup.com');
    } catch {
      return false;
    }
  })();

  if (!viewUrl) {
    return (
      <div
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          border: '2px dashed #e0e0e0',
          height,
        }}
      >
        <h3>ClickUp Integration</h3>
        <p>No ClickUp view URL configured.</p>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Go to ClickUp → Share → Get embeddable link to configure.
        </p>
      </div>
    );
  }

  if (!isValidClickUpUrl) {
    return (
      <div
        style={{
          backgroundColor: '#fff3cd',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid #ffc107',
          height,
        }}
      >
        <h3>⚠️ Invalid ClickUp URL</h3>
        <p>Please provide a valid ClickUp embed URL.</p>
      </div>
    );
  }

  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <div
        style={{
          backgroundColor: '#7b68ee',
          color: '#ffffff',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span style={{ fontSize: '20px' }}>✅</span>
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      <iframe
        src={viewUrl}
        style={{
          width: '100%',
          height,
          border: 'none',
          backgroundColor: '#ffffff',
        }}
        title={title}
        allowFullScreen
      />
    </div>
  );
}
