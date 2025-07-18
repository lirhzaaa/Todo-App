export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Todo {
  id: string;
  item: string;
  userId: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  content: {
    token: string;
    user: User;
  };
  message: string;
  errors: string[];
}

export interface TodosResponse {
  content: {
    entries: Todo[];
    totalData: number;
    totalPage: number;
  };
  message: string;
  errors: string[];
}

export interface ApiResponse<T> {
  content: T;
  message: string;
  errors: string[];
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  description?: string;
}

export interface CreateTodoData {
  item: string;
}

export interface UpdateTodoData {
  action: 'DONE' | 'UNDONE';
}

export interface FilterOptions {
  isDone?: boolean;
  search?: string;
  page?: number;
  rows?: number;
  orderKey?: string;
  orderRule?: 'asc' | 'desc';
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export interface TodoStore {
  todos: Todo[];
  selectedTodos: string[];
  filters: FilterOptions;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodoSelection: (id: string) => void;
  setSelectedTodos: (ids: string[]) => void;
  setFilters: (filters: FilterOptions) => void;
  clearFilters: () => void;
}
