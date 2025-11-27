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

export interface QuartzyResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
