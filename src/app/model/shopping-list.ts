export class ShoppingItem {
    name: string;
    shopName?: string;
    shopId: string;
    imageUrl: string;
    quantity: number;
    price: number;
  }
  
  export class ShoppingList {
    shopId?: string;
    id?: string
    name?: string
    items?: ShoppingItem[] = [];
    schedule?: Schedule;
    startDate?: Date;
    endDate?: Date;
    nextRunDate?: Date;
    userIds?: string[];
  }
  
  // Enum to represent the schedule types
  export enum Schedule {
    ONCE_OFF = 'ONCE_OFF',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
  }
  