import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, User } from '@/types';
import { authService } from '@/services/auth';
import { toast } from 'sonner';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string, rememberMe?: boolean) => {
        try {
          const response = await authService.login({ email, password, rememberMe });
          
          if (response.content?.token) {
            set({
              user: response.content.user,
              token: response.content.token,
              isAuthenticated: true,
            });
            
            localStorage.setItem('token', response.content.token);
            localStorage.setItem('user', JSON.stringify(response.content.user));
            
            document.cookie = `token=${response.content.token}; path=/; max-age=86400`;
            
            toast.success('Login successful!');
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || 'Login failed');
          throw error;
        }
      },

      register: async (data) => {
        try {
          const response = await authService.register(data);
          
          if (response.content?.token) {
            set({
              user: response.content.user,
              token: response.content.token,
              isAuthenticated: true,
            });
            
            localStorage.setItem('token', response.content.token);
            localStorage.setItem('user', JSON.stringify(response.content.user));
            
            document.cookie = `token=${response.content.token}; path=/; max-age=86400`;
            
            toast.success('Registration successful!');
          }
        } catch (error: any) {
          const errors = error.response?.data?.errors;
          if (Array.isArray(errors) && errors.length > 0) {
            toast.error(errors[0]);
          } else {
            toast.error(error.response?.data?.message || 'Registration failed');
          }
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        
        toast.success('Logged out successfully!');
      },

      checkAuth: () => {
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');
        
        if (token && userString) {
          try {
            const user = JSON.parse(userString);
            set({
              user,
              token,
              isAuthenticated: true,
            });
          } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
