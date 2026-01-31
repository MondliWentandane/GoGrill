// services/appwriteService.ts - UPDATED FOR TABLESDB API
import { Client, Account, TablesDB, Query, ID, type Models } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export { ID, Query };

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || 'restaurant_db';

export class ApiService {
  static DATABASE_ID = DATABASE_ID;

  // ============ CATEGORIES ============
  static async getCategories() {
    try {
      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: 'categories',
        queries: [
          Query.equal('isActive', true),
          Query.orderAsc('sortOrder'),
          Query.limit(100)
        ]
      });
      return response.rows;
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // ============ MEALS ============
  static async getMeals(categoryId?: string) {
    try {
      let queries = [
        Query.equal('isAvailable', true),
        Query.orderAsc('sortOrder'),
        Query.limit(100)
      ];
      
      if (categoryId) {
        queries.push(Query.equal('categoryId', categoryId));
      }
      
      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: 'meals',
        queries: queries
      });
      return response.rows;
    } catch (error: any) {
      console.error('Error fetching meals:', error);
      throw error;
    }
  }

  static async createMeal(mealData: any) {
    try {
      const data = {
        mealId: ID.unique(),
        ...mealData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const response = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: 'meals',
        rowId: ID.unique(),
        data: data
      });
      return response;
    } catch (error: any) {
      console.error('Error creating meal:', error);
      throw error;
    }
  }

  // ============ ORDERS ============
  static async getOrders(status?: string) {
    try {
      let queries = [
        Query.orderDesc('createdAt'),
        Query.limit(50)
      ];
      
      if (status) {
        queries.push(Query.equal('status', status));
      }
      
      const response = await tablesDB.listRows({
        databaseId: DATABASE_ID,
        tableId: 'orders',
        queries: queries
      });
      return response.rows;
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Add other methods similarly...
}

export default ApiService;