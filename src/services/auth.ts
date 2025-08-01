import apiClient from './api';
import { AuthResponse, LoginData, RegisterData } from '@/types';

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post('/login', {
      email: data.email,
      password: data.password,
    });
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post('/register', {
      email: data.email,
      fullName: `${data.firstName} ${data.lastName}`,
      password: data.password,
    });
    return response.data;
  },

  async verifyToken(token: string): Promise<{ message: string }> {
    const response = await apiClient.post('/verify-token', {
      token,
    });
    return response.data;
  },
};
