// mobile-app/services/appwriteService.ts - COMPLETE FIXED VERSION
import { Client, Account, Databases, Query, ID } from 'react-native-appwrite';

// Mobile app client
const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69771fd9001df1576f7e');

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, Query };

const DATABASE_ID = 'restaurant_db';

// Helper to convert AppWrite document to Meal type
export const mapToMeal = (doc: any) => ({
  id: doc.$id,
  name: doc.name,
  description: doc.description,
  price: doc.price,
  image: doc.image, // URL string from database
  categoryId: doc.categoryId,
  categoryName: doc.categoryName,
  preparationTime: doc.preparationTime || 15,
  isPopular: doc.isPopular || false,
  isDiscounted: doc.isDiscounted || false,
  discountPercentage: doc.discountPercentage,
  rating: 4.5, // Default for now
  ingredients: doc.ingredients || [],
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

// Helper to convert AppWrite document to Category type
export const mapToCategory = (doc: any) => ({
  id: doc.$id,
  name: doc.name,
  icon: doc.icon, // URL string from database
  description: doc.description,
  mealCount: doc.mealCount || 0,
});

export class ApiService {
  static DATABASE_ID = DATABASE_ID;

  // ============ PUBLIC ENDPOINTS (No auth required) ============
  
  static async getCategories() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'categories',
        [
          Query.orderAsc('sortOrder'),
          Query.equal('isActive', true),
          Query.limit(20)
        ]
      );
      
      return response.documents.map(mapToCategory);
    } catch (error: any) {
      console.error('Error fetching categories:', error.message);
      throw error;
    }
  }

  static async getMeals(categoryId?: string) {
    try {
      let queries = [
        Query.orderAsc('sortOrder'),
        Query.equal('isAvailable', true),
        Query.limit(50)
      ];
      
      if (categoryId) {
        queries.push(Query.equal('categoryId', categoryId));
      }
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        'meals',
        queries
      );
      
      return response.documents.map(mapToMeal);
    } catch (error: any) {
      console.error('Error fetching meals:', error.message);
      throw error;
    }
  }

  static async getPopularMeals() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'meals',
        [
          Query.equal('isPopular', true),
          Query.equal('isAvailable', true),
          Query.limit(10)
        ]
      );
      
      return response.documents.map(mapToMeal);
    } catch (error: any) {
      console.error('Error fetching popular meals:', error.message);
      throw error;
    }
  }

  static async getDiscountedMeals() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'meals',
        [
          Query.equal('isDiscounted', true),
          Query.equal('isAvailable', true),
          Query.limit(10)
        ]
      );
      
      return response.documents.map(mapToMeal);
    } catch (error: any) {
      console.error('Error fetching discounted meals:', error.message);
      throw error;
    }
  }

  // ============ USER ENDPOINTS ============
  
  static async createOrder(orderData: any) {
    try {
      const orderNumber = `ORD${Date.now().toString().slice(-8)}`;
      
      const orderDocument = {
        orderNumber: orderNumber,
        userId: orderData.userId || 'guest',
        customerName: orderData.customerName || 'Guest',
        customerEmail: orderData.customerEmail || '',
        customerPhone: orderData.customerPhone || '',
        items: JSON.stringify(orderData.items),
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee || 0,
        tax: orderData.tax || 0,
        totalAmount: orderData.totalAmount,
        deliveryType: orderData.deliveryType || 'delivery',
        deliveryAddress: orderData.deliveryAddress || '',
        deliveryInstructions: orderData.deliveryInstructions || '',
        status: 'pending',
        paymentMethod: orderData.paymentMethod || 'cash',
        paymentStatus: 'pending',
        orderTime: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
        specialInstructions: orderData.specialInstructions || '',
      };
      
      const response = await databases.createDocument(
        DATABASE_ID,
        'orders',
        ID.unique(),
        orderDocument
      );
      
      return response;
    } catch (error: any) {
      console.error('Error creating order:', error.message);
      throw error;
    }
  }

  static async getUserOrders(userId: string) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        'orders',
        [
          Query.equal('userId', userId),
          Query.orderDesc('$createdAt'),
          Query.limit(20)
        ]
      );
      
      return response.documents;
    } catch (error: any) {
      console.error('Error fetching user orders:', error.message);
      throw error;
    }
  }
}

export default ApiService;