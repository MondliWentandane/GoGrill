export interface User {
  $id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  prefs?: Record<string, any>;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionChecked: boolean;
}

export interface SignUpData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  password: string;
  agreeToTerms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}