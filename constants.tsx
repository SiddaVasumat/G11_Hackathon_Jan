
import { FoodItem, FoodStatus, StorageType, UserRole, UserProfile } from './types';

export const mockUser: UserProfile = {
  id: 'u-123',
  email: 'marco@bistro.com',
  role: UserRole.DONOR,
  fullName: 'Chef Marco',
  organizationName: 'Marco\'s Bistro',
  verified: true
};

export const initialFoodItems: FoodItem[] = [
  {
    id: 'f-1',
    donorId: 'u-123',
    title: 'Pasta Primavera',
    type: 'Cooked Meal',
    quantity: 15,
    unit: 'meals',
    timePrepared: new Date(Date.now() - 2 * 3600000).toISOString(),
    expiryTime: new Date(Date.now() + 6 * 3600000).toISOString(),
    storageType: StorageType.REFRIGERATED,
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: '123 Main St, New York, NY'
    },
    costBasis: 45.0,
    fairMarketValue: 180.0,
    status: FoodStatus.POSTED,
    createdAt: new Date().toISOString()
  },
  {
    id: 'f-2',
    donorId: 'u-999',
    title: 'Fresh Baguettes',
    type: 'Bakery',
    quantity: 20,
    unit: 'kg',
    timePrepared: new Date(Date.now() - 4 * 3600000).toISOString(),
    expiryTime: new Date(Date.now() + 12 * 3600000).toISOString(),
    storageType: StorageType.ROOM_TEMP,
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: 'Times Square, NY'
    },
    costBasis: 20.0,
    fairMarketValue: 60.0,
    status: FoodStatus.ACCEPTED,
    createdAt: new Date().toISOString()
  }
];

export const STATUS_COLORS: Record<FoodStatus, string> = {
  [FoodStatus.POSTED]: 'bg-blue-100 text-blue-700',
  [FoodStatus.ACCEPTED]: 'bg-yellow-100 text-yellow-700',
  [FoodStatus.PICKUP_ASSIGNED]: 'bg-purple-100 text-purple-700',
  [FoodStatus.PICKUP_CONFIRMED]: 'bg-orange-100 text-orange-700',
  [FoodStatus.IN_TRANSIT]: 'bg-indigo-100 text-indigo-700',
  [FoodStatus.DELIVERED]: 'bg-emerald-100 text-emerald-700',
  [FoodStatus.EXPIRED]: 'bg-red-100 text-red-700'
};
