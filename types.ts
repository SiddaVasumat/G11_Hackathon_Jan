
export enum UserRole {
  DONOR = 'DONOR',
  SHELTER = 'SHELTER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN'
}

export enum FoodStatus {
  POSTED = 'POSTED',
  ACCEPTED = 'ACCEPTED',
  PICKUP_ASSIGNED = 'PICKUP_ASSIGNED',
  PICKUP_CONFIRMED = 'PICKUP_CONFIRMED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  EXPIRED = 'EXPIRED'
}

export enum StorageType {
  REFRIGERATED = 'REFRIGERATED',
  FROZEN = 'FROZEN',
  ROOM_TEMP = 'ROOM_TEMP'
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  organizationName?: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface FoodItem {
  id: string;
  donorId: string;
  shelterId?: string;
  driverId?: string;
  title: string;
  type: string;
  quantity: number; // e.g. kg or meals
  unit: 'kg' | 'meals';
  timePrepared: string;
  expiryTime: string;
  storageType: StorageType;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  costBasis: number;
  fairMarketValue: number;
  status: FoodStatus;
  createdAt: string;
}

export interface AppState {
  user: UserProfile | null;
  activeItems: FoodItem[];
  notifications: string[];
}
