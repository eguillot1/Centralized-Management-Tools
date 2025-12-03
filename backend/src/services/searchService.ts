import { quartzyService } from './quartzyService';

export interface SearchResult {
  id: string;
  type: 'inventory' | 'order' | 'task' | 'visitor';
  title: string;
  description: string;
  link: string;
  relevance: number;
}

export const searchService = {
  async search(query: string, types?: string[]): Promise<SearchResult[]> {
    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();
    
    // Search inventory
    if (!types || types.includes('inventory')) {
      const inventoryResponse = await quartzyService.getInventory(1, 100);
      if (inventoryResponse.success) {
        for (const item of inventoryResponse.data) {
          const nameMatch = item.name.toLowerCase().includes(lowerQuery);
          const skuMatch = item.sku.toLowerCase().includes(lowerQuery);
          const categoryMatch = item.category.toLowerCase().includes(lowerQuery);
          
          if (nameMatch || skuMatch || categoryMatch) {
            let relevance = 0;
            if (nameMatch) relevance += 0.5;
            if (skuMatch) relevance += 0.3;
            if (categoryMatch) relevance += 0.2;
            
            results.push({
              id: item.id,
              type: 'inventory',
              title: item.name,
              description: `${item.location} • ${item.quantity} ${item.unit} in stock`,
              link: `/inventory/${encodeURIComponent(item.id)}`,
              relevance,
            });
          }
        }
      }
    }
    
    // Search orders
    if (!types || types.includes('order')) {
      const ordersResponse = await quartzyService.getOrders(1, 100);
      if (ordersResponse.success) {
        for (const order of ordersResponse.data) {
          const orderNumberMatch = order.orderNumber.toLowerCase().includes(lowerQuery);
          const vendorMatch = order.vendor?.toLowerCase().includes(lowerQuery);
          const itemsMatch = order.items.some((i) =>
            i.name.toLowerCase().includes(lowerQuery)
          );
          
          if (orderNumberMatch || vendorMatch || itemsMatch) {
            let relevance = 0;
            if (orderNumberMatch) relevance += 0.5;
            if (vendorMatch) relevance += 0.3;
            if (itemsMatch) relevance += 0.2;
            
            results.push({
              id: order.id,
              type: 'order',
              title: order.orderNumber,
              description: `${order.status} • $${order.totalAmount.toFixed(2)}`,
              link: `/orders/${encodeURIComponent(order.id)}`,
              relevance,
            });
          }
        }
      }
    }
    
    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    
    return results;
  },
};
