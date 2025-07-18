import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/services/todo';
import { useTodoStore } from '@/stores/todoStore';

export function useTodos() {
  const { filters } = useTodoStore();
  
  return useQuery({
    queryKey: ['todos', filters],
    queryFn: () => todoService.getTodos(filters),
    staleTime: 5 * 60 * 1000,
  });
}
