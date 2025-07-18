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
    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
    
    const emailWithoutSuffix = data.email.replace('@squareteam.com', '');
    const finalEmail = `${emailWithoutSuffix}@squareteam.com`;
    
    if (!fullName) {
      throw new Error('Full name cannot be empty');
    }
    
    const payload = {
      email: finalEmail,
      fullName: fullName,
      password: data.password,
    };
    
    const response = await apiClient.post('/register', payload);
    return response.data;
  },

  async verifyToken(token: string): Promise<{ message: string }> {
    const response = await apiClient.post('/verify-token', {
      token,
    });
    return response.data;
  },
};
