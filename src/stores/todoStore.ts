import { create } from 'zustand';
import { TodoStore, Todo, FilterOptions } from '@/types';

const getInitialSelectedTodos = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('selectedTodos');
      if (saved) return JSON.parse(saved);
    } catch {}
  }
  return [];
};

export const useTodoStore = create<TodoStore>()((set, get) => ({
  todos: [],
  selectedTodos: getInitialSelectedTodos(),
  filters: {
    page: 1,
    rows: 10,
    orderKey: 'createdAt',
    orderRule: 'desc',
  },

  setTodos: (todos: Todo[]) => {
    set({ todos });
  },

  addTodo: (todo: Todo) => {
    set((state) => ({
      todos: [todo, ...state.todos],
    }));
  },

  updateTodo: (id: string, updates: Partial<Todo>) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    }));
  },

  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      selectedTodos: state.selectedTodos.filter((selectedId) => selectedId !== id),
    }));
  },


  toggleTodoSelection: (id: string) => {
    set((state) => {
      const selected = state.selectedTodos.includes(id)
        ? state.selectedTodos.filter((selectedId) => selectedId !== id)
        : [...state.selectedTodos, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedTodos', JSON.stringify(selected));
      }
      return { selectedTodos: selected };
    });
  },

  setSelectedTodos: (ids: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTodos', JSON.stringify(ids));
    }
    set({ selectedTodos: ids });
  },

  setFilters: (filters: FilterOptions) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        page: 1,
        rows: 10,
        orderKey: 'createdAt',
        orderRule: 'desc',
      },
    });
  },
}));
