
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  seller: string;
  sellerLevel?: 'platinum' | 'gold' | 'standard';
  category: string;
  shipping: 'free' | 'paid';
  rating: number;
  reviews: number;
  isPrime?: boolean;
  isFlashDeal?: boolean;
  flashDealEndTime?: number; // Timestamp
  stockSold?: number;
  stockTotal?: number;
  // Location & Logistics
  city?: string;
  neighborhood?: string;
  status?: 'active' | 'pending_approval' | 'paused';
  // New fields
  condition?: 'new' | 'used';
  listingType?: 'classic' | 'premium';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountAmount?: number;
  minSpend?: number;
  type: 'shipping' | 'discount';
}

export interface Question {
  id: string;
  productId: string;
  user: string;
  text: string;
  answer?: string;
  date: string;
  timeAgo?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'paid' | 'shipping' | 'delivered' | 'cancelled';
  customerName: string;
  paymentMethod: 'credit' | 'pix' | 'boleto';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: 'sale' | 'question' | 'system';
  date: string;
}

export type ViewState = 'home' | 'product-detail' | 'sell' | 'cart' | 'checkout' | 'order-confirmed' | 'seller-dashboard' | 'admin-dashboard' | 'categories' | 'purchases' | 'auth' | 'favorites';

export const CATEGORIES = [
  "Tecnologia",
  "Moda",
  "Casa",
  "Esportes",
  "Brinquedos",
  "Beleza",
  "Games",
  "Livros"
];