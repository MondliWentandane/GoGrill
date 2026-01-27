import { account, ID } from './appwriteService';
import { SignUpData, LoginData } from '@/types/user.types';

export class AuthService {
  static async signUp(data: SignUpData) {
    try {
      const user = await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.name
      );
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Sign up failed');
    }
  }

  static async login(data: LoginData) {
    try {
      const session = await account.createEmailPasswordSession(
        data.email,
        data.password
      );
      return session;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  }

  static async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  }

  static async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  static async checkSession() {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }
}