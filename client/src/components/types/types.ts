export enum RoutePath {
  ROOT = '/',
  HOME = '/home',
  MEMBERS = '/members',
  REGISTER = '/register'
}

export interface RegisterRequest {
  fullname: string;
  email: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

// Defines the structure expected by the Base API class
export interface RequestConfig {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}

