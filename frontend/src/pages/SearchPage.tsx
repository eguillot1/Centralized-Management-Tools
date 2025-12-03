import React, { useState } from 'react';
import { searchService } from '../services';
import { SearchResult } from '../types';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const searchTypes = [
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'order', label: 'Orders', icon: '🛒' },
    { id: 'task', label: 'Tasks', icon: '✅' },
    { id: 'visitor', label: 'Visitors', icon: '🏢' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const searchResults = await searchService.search(query, selectedTypes);
      setResults(searchResults);
    } catch {
      // Demo data
      setResults([
        {
          id: '1',
          type: 'inventory',
          title: 'Pipette Tips 200µL',
          description: 'Lab A - Shelf 1 • 5000 tips in stock',
          link: '/inventory/1',
          relevance: 0.95,
        },
        {
          id: '2',
          type: 'order',
          title: 'ORD-2024-001',
          description: 'Pending order for Pipette Tips',
          link: '/orders/1',
          relevance: 0.85,
        },
        {
          id: '3',
          type: 'task',
          title: 'Review inventory levels',
          description: 'Due today • Assigned to John',
          link: '/clickup',
          relevance: 0.75,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = searchTypes.find((t) => t.id === type);
    return typeConfig?.icon || '📄';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      inventory: '#4caf50',
      order: '#ff9800',
      task: '#7b68ee',
      visitor: '#2196f3',
    };
    return colors[type] || '#666';
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, color: '#1a1a2e' }}>Global Search</h1>
        <p style={{ color: '#666', marginTop: '8px' }}>
          Search across inventory, orders, tasks, and visitors.
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          marginBottom: '24px',
        }}
      >
        <form onSubmit={handleSearch}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for anything..."
              style={{
                flex: 1,
                padding: '14px 20px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
              }}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              style={{
                padding: '14px 32px',
                backgroundColor: query.trim() ? '#4fc3f7' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: query.trim() ? 'pointer' : 'not-allowed',
                fontWeight: '600',
                fontSize: '16px',
              }}
            >
              {isLoading ? 'Searching...' : '🔍 Search'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: '#666', fontSize: '14px', marginRight: '8px', alignSelf: 'center' }}>
              Filter by:
            </span>
            {searchTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => toggleType(type.id)}
                style={{
                  padding: '6px 14px',
                  backgroundColor: selectedTypes.includes(type.id) ? getTypeColor(type.id) : '#f5f5f5',
                  color: selectedTypes.includes(type.id) ? '#fff' : '#333',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </form>
      </div>

      {hasSearched && (
        <div>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
              }}
            >
              <p style={{ color: '#666', margin: 0 }}>
                No results found for &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div>
              <p style={{ color: '#666', marginBottom: '16px' }}>
                Found {results.length} results for &quot;{query}&quot;
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {results.map((result) => (
                  <a
                    key={result.id}
                    href={result.link}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        padding: '16px 20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'box-shadow 0.2s',
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          backgroundColor: getTypeColor(result.type),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                        }}
                      >
                        {getTypeIcon(result.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ margin: 0, color: '#1a1a2e', fontSize: '16px' }}>
                          {result.title}
                        </h3>
                        <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                          {result.description}
                        </p>
                      </div>
                      <span
                        style={{
                          padding: '4px 10px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#666',
                          textTransform: 'capitalize',
                        }}
                      >
                        {result.type}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!hasSearched && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ margin: '0 0 8px', color: '#1a1a2e' }}>Search Across All Systems</h3>
          <p style={{ margin: 0, maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            Enter a search term to find inventory items, orders, tasks, visitors, and more.
          </p>
        </div>
      )}
    </div>
  );
}
