import apiClient from './api';
import { TodosResponse, CreateTodoData, UpdateTodoData, FilterOptions, ApiResponse } from '@/types';

export const todoService = {
  async getTodos(filters?: FilterOptions): Promise<TodosResponse> {
    const params = new URLSearchParams();
    
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.rows) params.append('rows', filters.rows.toString());
    if (filters?.orderKey) params.append('orderKey', filters.orderKey);
    if (filters?.orderRule) params.append('orderRule', filters.orderRule);
    
    if (filters?.isDone !== undefined) {
      params.append('filters', JSON.stringify({ isDone: filters.isDone }));
    }
    
    if (filters?.search) {
      params.append('searchFilters', JSON.stringify({ item: filters.search }));
    }
    
    const response = await apiClient.get(`/todos?${params.toString()}`);
    return response.data;
  },

  async createTodo(data: CreateTodoData): Promise<ApiResponse<any>> {
    const response = await apiClient.post('/todos', data);
    return response.data;
  },

  async updateTodo(id: string, data: UpdateTodoData): Promise<ApiResponse<any>> {
    const response = await apiClient.put(`/todos/${id}/mark`, data);
    return response.data;
  },

  async deleteTodo(id: string): Promise<ApiResponse<any>> {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  },

  async deleteTodos(ids: string[]): Promise<void> {
    await Promise.all(ids.map(id => this.deleteTodo(id)));
  },
};
