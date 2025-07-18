'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useTodoStore } from '@/stores/todoStore';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, User2 } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { filters, setFilters } = useTodoStore();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        if (pathname === '/dashboard') {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ ...filters, search: value, page: 1 });
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleAdmin = () => {
    router.push('/admin');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
        <div className="flex items-center h-16 w-full">
          <div className="flex items-center gap-2 w-80 flex-shrink-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">
              <img src="/star.png" alt="star" className="w-6 h-6" />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search (Ctrl+/)"
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 text-sm focus:outline-none border-none shadow-none rounded-md"
              style={{ boxShadow: 'none', border: 'none' }}
            />
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
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
                <DropdownMenuItem onClick={handleAdmin}>
                  <User2 className="h-4 w-4 mr-2" />
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}