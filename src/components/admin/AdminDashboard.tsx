
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/services/todo';
import { useTodoStore } from '@/stores/todoStore';
import { useAuthStore } from '@/stores/authStore';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, LogOut, CheckCircle, XCircle, User, ChevronLeft, ChevronRight, Home, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '@/types';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';


export default function AdminDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'done' | 'undone'>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { filters, setFilters, selectedTodos } = useTodoStore();
  const { user, logout } = useAuthStore();
  useEffect(() => {
    if (searchInputValue.trim() === '' && searchTerm !== '') {
      setSearchTerm('');
    }
  }, [searchInputValue]);
  let userMap: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.id && parsed.fullName) {
          userMap[parsed.id] = parsed.fullName;
        }
      }
    } catch { }
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-todos', filters, searchTerm],
    queryFn: () => todoService.getTodos({
      ...filters,
      search: searchTerm,
      isDone: undefined,
    }),
    staleTime: 1000 * 60 * 5,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim() === '' ? '' : value);
  };

  useEffect(() => {
    setSearchInputValue(searchTerm);
  }, [searchTerm]);

  const handleFilterChange = (value: 'all' | 'done' | 'undone') => {
    setStatusFilter(value);
  };

  let todos = data?.content?.entries || [];
  if (statusFilter === 'done') {
    todos = todos.filter(
      (todo: Todo) => todo.isDone || selectedTodos.includes(todo.id)
    );
  } else if (statusFilter === 'undone') {
    todos = todos.filter(
      (todo: Todo) => !todo.isDone && !selectedTodos.includes(todo.id)
    );
  }
  const totalData = todos.length;
  const totalPages = data?.content?.totalPage || 0;

  return (
    <div className="flex min-h-screen bg-gray-50">

      <div
        className={`bg-white shadow-sm border-r transition-all duration-200 ${sidebarCollapsed ? 'w-14' : 'w-64'}`}
      >
        <div className={`border-b h-16 flex ${sidebarCollapsed ? 'flex-col justify-center items-center p-0' : 'flex-row items-center justify-between p-6'}`}>
          <h1 className={`text-xl font-bold text-gray-900 transition-opacity duration-200 ${sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>NodeWave</h1>
          <button
            className={`rounded hover:bg-gray-100 transition-colors ${sidebarCollapsed ? 'mt-0 mb-0 flex items-center justify-center w-full h-10' : 'ml-2 p-1'}`}
            style={sidebarCollapsed ? { minWidth: 0, minHeight: 0 } : {}}
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>
        <nav className={`flex flex-col items-center gap-2 ${sidebarCollapsed ? 'pt-2' : 'p-4'}`}>
          <Button
            variant="ghost"
            className={`transition-all duration-200 w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0 h-10' : 'justify-start font-normal'}`}
            disabled
          >
            <Home className="h-5 w-5" />
            <span className={`ml-2 transition-opacity duration-200 ${sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>To-do</span>
          </Button>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center space-x-4 justify-end">
            <span className="font-medium text-base text-gray-700 max-w-[160px] truncate">
              {user?.fullName}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar>
                    <Image
                      src="/default-avatar.png"
                      alt="avatar"
                      width={32}
                      height={32}
                      className="object-cover rounded-full"
                    />
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDashboard}>
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6">To Do</h2>
          <Card>
            <CardHeader>
              <CardTitle>All Todo</CardTitle>
              <div className="flex items-center gap-4 mt-4">
                <form
                  className="relative flex-1 max-w-md flex items-center gap-2"
                  onSubmit={e => {
                    e.preventDefault();
                    handleSearch(searchInputValue);
                  }}
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search ..."
                    value={searchInputValue}
                    onChange={e => setSearchInputValue(e.target.value)}
                    className="pl-10 w-full h-12 border-0 border-b-2 border-gray-300 focus:border-blue-500 bg-transparent rounded-none text-base placeholder-gray-400 transition-colors outline-none"
                    style={{ boxShadow: 'none' }}
                  />
                  <Button type="submit" className="ml-2 h-10 px-6" style={{
                    backgroundColor: '#0062FF',
                    color: '#fff',
                  }}>Search</Button>
                </form>
                <Select value={statusFilter} onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="undone">Undone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading todo...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500">Error loading todo</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>To Do</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todos.map((todo: Todo) => {
                        const isSelected = selectedTodos.includes(todo.id);
                        const isDone = isSelected || todo.isDone;
                        return (
                          <TableRow key={todo.id}>
                            <TableCell>
                              {userMap[todo.userId] || todo.userId}
                            </TableCell>
                            <TableCell className="font-medium">
                              <span className={isDone ? 'line-through text-muted-foreground' : ''}>
                                {todo.item}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  background: isDone ? '#70DE54' : '#FC5A5A',
                                  color: '#fff',
                                  borderRadius: '16px',
                                  fontWeight: 500,
                                  fontSize: '0.875rem',
                                  padding: '0.25rem 0.75rem',
                                }}
                              >
                                {isDone ? (
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                ) : (
                                  <XCircle className="mr-1 h-3 w-3" />
                                )}
                                {isDone ? 'Success' : 'Pending'}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  {todos.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No todo found</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {todos.length} of {totalData} todo
                    </p>
                    <div className="flex gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters({ ...filters, page: (filters.page || 1) - 1 })}
                        disabled={filters.page === 1}
                        style={{ minWidth: 32, padding: 0 }}
                      >
                        {'<'}
                      </Button>
                      {Array.from({ length: totalPages || 1 }, (_, i) => {
                        const pageNum = i + 1;
                        const isActive = filters.page === pageNum || (!filters.page && pageNum === 1);
                        return (
                          <Button
                            key={pageNum}
                            variant="outline"
                            size="sm"
                            onClick={isActive ? undefined : () => setFilters({ ...filters, page: pageNum })}
                            style={{
                              minWidth: 32,
                              padding: 0,
                              background: isActive ? '#0062FF' : undefined,
                              color: isActive ? '#fff' : undefined,
                              fontWeight: isActive ? 600 : undefined,
                              pointerEvents: isActive ? 'none' : undefined,
                            }}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
                        disabled={filters.page === totalPages || totalPages < 2}
                        style={{ minWidth: 32, padding: 0 }}
                      >
                        {'>'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
