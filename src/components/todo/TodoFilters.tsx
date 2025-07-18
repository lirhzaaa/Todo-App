'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTodoStore } from '@/stores/todoStore';
import { Search, Filter } from 'lucide-react';

export default function TodoFilters() {
  const { filters, setFilters } = useTodoStore();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    const savedFilters = localStorage.getItem('dashboard-filters');
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        setFilters(parsed);
        if (parsed.search) setSearchTerm(parsed.search);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-filters', JSON.stringify(filters));
  }, [filters]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleStatusFilter = (isDone: boolean | undefined) => {
    setFilters({ ...filters, isDone, page: 1 });
  };

  const getCurrentFilterLabel = () => {
    if (filters.isDone === undefined) return 'All';
    return filters.isDone ? 'Done' : 'Undone';
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Todos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tods..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filters.isDone === undefined ? 'default' : 'outline'}
              onClick={() => handleStatusFilter(undefined)}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filters.isDone === false ? 'default' : 'outline'}
              onClick={() => handleStatusFilter(false)}
              size="sm"
            >
              Undone
            </Button>
            <Button
              variant={filters.isDone === true ? 'default' : 'outline'}
              onClick={() => handleStatusFilter(true)}
              size="sm"
            >
              Done
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
