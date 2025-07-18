import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/services/todo';
import { toast } from 'sonner';

export function useTodoMutations() {
  const queryClient = useQueryClient();

  const createTodo = useMutation({
    mutationFn: (item: string) => todoService.createTodo({ item }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create todo');
    },
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, isDone }: { id: string; isDone: boolean }) =>
      todoService.updateTodo(id, { action: isDone ? 'DONE' : 'UNDONE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update todo');
    },
  });

  const deleteTodo = useMutation({
    mutationFn: todoService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete todo');
    },
  });

  const deleteTodos = useMutation({
    mutationFn: todoService.deleteTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Selected todo deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete selected todo');
    },
  });

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    deleteTodos,
  };
}
