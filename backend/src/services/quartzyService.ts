import { v4 as uuidv4 } from 'uuid';
import { cacheService } from './cacheService';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  category: string;
  location: string;
  minQuantity: number;
  maxQuantity: number;
  lastUpdated: string;
  supplier?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'approved' | 'ordered' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  requestedBy: string;
  approvedBy?: string;
  vendor?: string;
  notes?: string;
}

export interface OrderItem {
  id: string;
  inventoryItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Demo data (in production, this would connect to Quartzy API)
const inventoryItems: InventoryItem[] = [
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
];

const orders: Order[] = [
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
];

export const quartzyService = {
  // Inventory methods
  async getInventory(
    page = 1,
    limit = 20,
    category?: string
  ): Promise<{ success: boolean; data: InventoryItem[]; pagination: object }> {
    const cacheKey = `inventory:${page}:${limit}:${category || 'all'}`;
    const cached = await cacheService.get<{ success: boolean; data: InventoryItem[]; pagination: object }>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    let filtered = inventoryItems;
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    
    const result = {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
    
    await cacheService.set(cacheKey, result, 60); // Cache for 1 minute
    return result;
  },

  async getInventoryItem(id: string): Promise<{ success: boolean; data: InventoryItem; error?: string }> {
    const cacheKey = `inventory:item:${id}`;
    const cached = await cacheService.get<{ success: boolean; data: InventoryItem }>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const item = inventoryItems.find((i) => i.id === id);
    
    if (!item) {
      return { success: false, data: {} as InventoryItem, error: 'Item not found' };
    }
    
    const result = { success: true, data: item };
    await cacheService.set(cacheKey, result, 60);
    return result;
  },

  async createInventoryItem(
    data: Omit<InventoryItem, 'id' | 'lastUpdated'>
  ): Promise<{ success: boolean; data: InventoryItem }> {
    const item: InventoryItem = {
      ...data,
      id: uuidv4(),
      lastUpdated: new Date().toISOString(),
    };
    
    inventoryItems.push(item);
    await cacheService.invalidatePattern('inventory:*');
    
    return { success: true, data: item };
  },

  async updateInventoryItem(
    id: string,
    data: Partial<InventoryItem>
  ): Promise<{ success: boolean; data: InventoryItem; error?: string }> {
    const index = inventoryItems.findIndex((i) => i.id === id);
    
    if (index === -1) {
      return { success: false, data: {} as InventoryItem, error: 'Item not found' };
    }
    
    inventoryItems[index] = {
      ...inventoryItems[index],
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    
    await cacheService.invalidatePattern('inventory:*');
    
    return { success: true, data: inventoryItems[index] };
  },

  // Orders methods
  async getOrders(
    page = 1,
    limit = 20,
    status?: string
  ): Promise<{ success: boolean; data: Order[]; pagination: object }> {
    const cacheKey = `orders:${page}:${limit}:${status || 'all'}`;
    const cached = await cacheService.get<{ success: boolean; data: Order[]; pagination: object }>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    let filtered = orders;
    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }
    
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    
    const result = {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
    
    await cacheService.set(cacheKey, result, 30); // Cache for 30 seconds
    return result;
  },

  async getOrder(id: string): Promise<{ success: boolean; data: Order; error?: string }> {
    const order = orders.find((o) => o.id === id);
    
    if (!order) {
      return { success: false, data: {} as Order, error: 'Order not found' };
    }
    
    return { success: true, data: order };
  },

  async createOrder(
    data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ success: boolean; data: Order }> {
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`;
    
    const order: Order = {
      ...data,
      id: uuidv4(),
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    orders.push(order);
    await cacheService.invalidatePattern('orders:*');
    
    return { success: true, data: order };
  },

  async updateOrderStatus(
    id: string,
    status: Order['status'],
    notes?: string
  ): Promise<{ success: boolean; data: Order; error?: string }> {
    const index = orders.findIndex((o) => o.id === id);
    
    if (index === -1) {
      return { success: false, data: {} as Order, error: 'Order not found' };
    }
    
    orders[index] = {
      ...orders[index],
      status,
      notes: notes || orders[index].notes,
      updatedAt: new Date().toISOString(),
    };
    
    await cacheService.invalidatePattern('orders:*');
    
    return { success: true, data: orders[index] };
  },
};
