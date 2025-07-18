'use client';

import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/services/todo';
import { useTodoStore } from '@/stores/todoStore';
import { Todo } from '@/types';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Check, X, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Pagination from './Pagination';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
  selectedTodos: string[];
  onToggleSelection: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
  isLoading: boolean;
  error: unknown;
  currentPage: number;
  totalPages: number;
}

function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  selectedTodos,
  onToggleSelection,
  isUpdating,
  isDeleting,
  isLoading,
  error,
  currentPage,
  totalPages,
}: TodoListProps) {
  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo)}
          onDelete={() => onDeleteTodo(todo.id)}
          isSelected={selectedTodos.includes(todo.id)}
          onToggleSelection={() => onToggleSelection(todo.id)}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => {}}
      />
    </div>
  );
}

export default TodoList;

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  isSelected: boolean;
  onToggleSelection: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  isSelected,
  onToggleSelection,
  isUpdating,
  isDeleting,
}: TodoItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b-2 last:border-b-0">
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelection}
          className={
            `w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors duration-150 ` +
            (isSelected
              ? 'border-[#6DD230] bg-[#E9F9E4] text-[#6DD230]'
              : 'border-[#E6E6E6] bg-[#E6E6E6] text-transparent')
          }
        />
        <span className={`flex-1 ${todo.isDone ? 'line-through text-muted-foreground' : ''}`}>
          {todo.item}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={
            `inline-flex items-center justify-center rounded-full border-2 ` +
            (isSelected
              ? 'border-[#F01414] text-[#F01414]'
              : 'border-[#6DD230] text-[#6DD230]')
          }
          style={{ width: 32, height: 32 }}
        >
          {isSelected ? (
            <X className="w-5 h-5 font-bold" strokeWidth={3} />
          ) : (
            <Check className="w-5 h-5 font-bold" strokeWidth={3} />
          )}
        </span>
      </div>
    </div>
  );
}
