'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuthStore } from '@/stores/authStore';
import { loginSchema, LoginFormData } from '@/utils/validations';
import Link from 'next/link';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password, data.rememberMe);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold" style={{
            color: '#44444F',
            paddingBottom: '2rem', 
            }}
            >Sign In</h1>
          <p className="text-gray-600">Just sign in if you have an account in here. Enjoy our Website</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <div>
                      <Input
                        {...field}
                        type="email"
                        placeholder="yourname@squareteam.com"
                        disabled={isLoading}
                        className="peer placeholder-transparent shadow-none border-2 border-gray-300 focus:border-[#0070f3] focus:ring-0 w-full"
                        style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }}
                      />
                      <label className="absolute left-3 -top-3 text-xs text-[#0070f3] transition-all duration-200 pointer-events-none bg-white px-1">
                        Your Email / Username
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <div>
                      <Input
                        {...field}
                        type="password"
                        placeholder="******"
                        disabled={isLoading}
                        className="peer placeholder-transparent shadow-none border-2 border-gray-300 focus:border-[#0070f3] focus:ring-0 w-full"
                        style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }}
                      />
                      <label className="absolute left-3 -top-3 text-xs text-[#0070f3] transition-all duration-200 pointer-events-none bg-white px-1">
                        Enter Password
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 m-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="font-normal m-0">Remember me</FormLabel>
                  </FormItem>
                )}
              />
              <Button variant="link" className="p-0 text-sm" asChild>
                <Link href="/forgot-password">Forgot Password?</Link>
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading} style={{
              backgroundColor: isLoading ? '#ccc' : '#0070f3',
            }}>
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>

            <div className="text-center text-sm" style={{ 
              color: '#0070f3',
             }}>
              Don't have a Square account?{' '}
              <Button variant="link" className="p-0" asChild style={{ 
                color: '#0070f3',
               }}>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
