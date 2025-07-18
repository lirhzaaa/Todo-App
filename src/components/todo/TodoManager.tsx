'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTodoStore } from '@/stores/todoStore';
import { todoService } from '@/services/todo';
import { todoSchema, TodoFormData } from '@/utils/validations';
import { toast } from 'sonner';
import { Todo } from '@/types';
import { Trash2, Plus } from 'lucide-react';
import TodoList from './TodoList';


export default function TodoManager() {
  const onSubmit = (data: TodoFormData) => {
    createTodoMutation.mutate({ item: data.item });
  };

  const handleToggleTodo = (todo: Todo) => {
    const action = todo.isDone ? 'UNDONE' : 'DONE';
    updateTodoMutation.mutate({ id: todo.id, action });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      item: '',
    },
  });

  const createTodoMutation = useMutation({
    mutationFn: todoService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      form.reset();
      toast.success('Todo created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create todo');
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'DONE' | 'UNDONE' }) =>
      todoService.updateTodo(id, { action }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update todo');
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete todo');
    },
  });

  const deleteSelectedMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      try {
        await todoService.deleteTodos(ids);
        return ids;
      } catch (err: any) {
        throw new Error(err?.response?.data?.message || 'Failed to delete selected todo');
      }
    },
    onSuccess: (ids: string[]) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Selected todo deleted successfully!');
      setSelectedTodos([]);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete selected todo');
    },
  });


  const todoStore = useTodoStore();
  const filters = todoStore.filters;
  const selectedTodos = todoStore.selectedTodos;
  const toggleTodoSelection = todoStore.toggleTodoSelection;
  const setSelectedTodos = todoStore.setSelectedTodos;

  const {
    data,
    isLoading: isTodosLoading,
    error: todosError,
  } = useQuery({
    queryKey: ['todos', filters],
    queryFn: () => todoService.getTodos(filters),
    staleTime: 1000 * 60 * 5,
  });
  const todos = data?.content?.entries || [];
  const totalPages = data?.content?.totalPage || 1;
  const currentPage = filters.page || 1;
  const isTodosEmpty = todos.length === 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-2 text-center" style={{ 
        color: '#174286',
        fontWeight: 'bold',
        fontSize: '2.5rem',
        padding: '50px 0px'
       }}>To Do</h2>
      <Card>
        <CardContent>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-end gap-2">
                  <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="relative">
                          <Input
                            {...field}
                            id="add-task-input"
                            autoComplete="off"
                            disabled={createTodoMutation.isPending}
                            className="peer h-12 px-0 border-0 border-b-2 border-gray-300 focus:border-blue-500 bg-transparent rounded-none text-base placeholder-transparent transition-colors !shadow-none !ring-0 !outline-none focus:!shadow-none focus:!ring-0 focus:!outline-none active:!shadow-none active:!ring-0 active:!outline-none"
                            placeholder=" "
                          />
                          <label
                            htmlFor="add-task-input"
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none transition-all duration-200
                              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                              peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-600
                              peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600"
                          >
                            Add a new task
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={createTodoMutation.isPending}
                    className="h-12 px-6"
                    style={{ 
                      backgroundColor: '#0062FF',
                      color: '#fff',
                     }}
                  >
                    {createTodoMutation.isPending ? 'Adding...' : 'Add Todo'}
                  </Button>
                </div>
              </form>
            </Form>

            {!isTodosEmpty && (
              <>
                <TodoList
                  todos={todos}
                  onToggleTodo={handleToggleTodo}
                  onDeleteTodo={handleDeleteTodo}
                  selectedTodos={selectedTodos}
                  onToggleSelection={toggleTodoSelection}
                  isUpdating={updateTodoMutation.isPending}
                  isDeleting={deleteTodoMutation.isPending}
                  isLoading={isTodosLoading}
                  error={todosError}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
                <div className="flex justify-start mt-4">
                  <Button
                    variant="destructive"
                    onClick={() => deleteSelectedMutation.mutate(selectedTodos)}
                    disabled={selectedTodos.length === 0 || deleteSelectedMutation.isPending}
                    style={{ 
                      backgroundColor: '#FC5A5A'
                     }}
                  >
                    {deleteSelectedMutation.isPending ? 'Deleting...' : 'Deleted Selected'}
                  </Button>
                </div>
              </>
            )}

            {isTodosEmpty && !isTodosLoading && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No todo found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );}