'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTodoStore } from '@/stores/todoStore';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { filters, setFilters } = useTodoStore();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setFilters({ ...filters, page });
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-end space-x-2 w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {getPageNumbers().map((page, index) => {
          const isActive = page === currentPage;
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={typeof page === 'number' && !isActive ? () => handlePageChange(page as number) : undefined}
              disabled={page === '...'}
              className="min-w-[40px]"
              style={isActive ? {
                background: '#0062FF',
                color: '#fff',
                fontWeight: 600,
                pointerEvents: 'none',
              } : {}}
            >
              {page}
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-right text-sm text-gray-500 mt-3">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
