// Core types for AgriSync Pro

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  farmSize: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: 'seeds' | 'tools' | 'fruits' | 'fertilizers';
  quantity: number;
  unit: string;
  price: number;
  expirationDate?: Date;
  supplier: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inventory {
  id: string;
  productId: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  lastRestocked: Date;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface WeatherData {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  forecast: WeatherForecast[];
  timestamp: Date;
}

export interface WeatherForecast {
  date: Date;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  rainProbability: number;
}

export interface CropRecommendation {
  id: string;
  cropName: string;
  soilType: string;
  season: string;
  landArea: number;
  estimatedYield: number;
  resources: Resource[];
  instructions: string[];
  createdAt: Date;
}

export interface Resource {
  name: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
}

export interface MarketPrice {
  id: string;
  productName: string;
  location: string;
  currentPrice: number;
  previousPrice: number;
  changePercentage: number;
  traders: Trader[];
  lastUpdated: Date;
}

export interface Trader {
  id: string;
  name: string;
  phone: string;
  location: string;
  price: number;
  rating: number;
}

export interface Analytics {
  totalRevenue: number;
  totalInventory: number;
  lowStockItems: number;
  outOfStockItems: number;
  topSellingProducts: Product[];
  seasonalAnalysis: SeasonalData[];
  profitAnalysis: ProfitData[];
}

export interface SeasonalData {
  season: string;
  product: string;
  sales: number;
  revenue: number;
}

export interface ProfitData {
  product: string;
  revenue: number;
  cost: number;
  profit: number;
  profitMargin: number;
}

export interface Alert {
  id: string;
  type: 'low-stock' | 'expiration' | 'weather' | 'market';
  message: string;
  severity: 'low' | 'medium' | 'high';
  isRead: boolean;
  createdAt: Date;
}
