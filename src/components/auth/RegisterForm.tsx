declare global {
  interface Window {
    toast?: { error: (msg: string) => void };
  }
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/stores/authStore';
import { registerSchema, RegisterFormData } from '@/utils/validations';
import Link from 'next/link';

const countries = [
  { value: 'ID', label: 'Indonesia' },
  { value: 'US', label: 'United States' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'SG', label: 'Singapore' },
  { value: 'TH', label: 'Thailand' },
  { value: 'PH', label: 'Philippines' },
  { value: 'VN', label: 'Vietnam' },
];

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
      email: '',
      password: '',
      confirmPassword: '',
      description: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await register(data);
      router.push('/dashboard');
    } catch (error: any) {
      const msg = error?.response?.data?.message || error?.message || 'Registrasi gagal, terjadi kesalahan server.';
      if (typeof window !== 'undefined' && window.toast) {
        window.toast.error(msg);
      } else {
        alert(msg);
      }
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold" style={{ color: '#44444F', paddingBottom: '2rem' }}>
            Register
          </h1>
          <p className="text-gray-600">Let's Sign up first for enter into Square Website. Uh She Up!</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          placeholder=" "
                          className="peer placeholder-transparent shadow-none border-2 border-gray-300 focus:border-[#0070f3] focus:ring-0"
                          style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }}
                        />
                        <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 pointer-events-none bg-white px-1
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
                            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600">
                          First Name
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div>
                        <Input
                          {...field}
                          placeholder=" "
                          className="peer placeholder-transparent shadow-none border-2 border-gray-300 focus:border-[#0070f3] focus:ring-0"
                          style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }}
                        />
                        <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 pointer-events-none bg-white px-1
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
                            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600">
                          Last Name
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col">
                <div className="flex gap-2 w-full">
                  <div className="flex flex-col items-center justify-center">
                    <Input
                      value="+62"
                      disabled
                      className="w-16 h-10 px-2 py-1 text-center bg-gray-50 border-2 border-blue-500 rounded focus:ring-0 focus:border-blue-600"
                      style={{
                        marginTop: 0,
                        borderRadius: '10px',
                        color: '#0070f3',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="w-full relative">
                          <FormControl>
                            <div>
                              <Input {...field} placeholder=" " className="w-full peer placeholder-transparent shadow-none border-2 border-gray-300 focus:border-[#0070f3] focus:ring-0" style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }} />
                              <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 pointer-events-none bg-white px-1
                                  peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                                  peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
                                  peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600">
                                Phone Number
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className={`border-2 shadow-none focus:ring-0 ${field.value ? 'border-[#0070f3]' : 'border-gray-300'}`}
                            style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }}
                          >
                            <SelectValue placeholder="Your Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <div className="flex w-full">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          placeholder=" "
                          className="rounded-r-none peer placeholder-transparent w-full shadow-none border-2 border-gray-300 focus:border-[#0070f3] focus:ring-0"
                          style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }}
                        />
                        <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 pointer-events-none bg-white px-1
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
                            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600">
                          Email
                        </label>
                      </div>
                      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        @squareteam.com
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div>
                        <Input {...field} type="password" placeholder=" " className="peer placeholder-transparent shadow-none border-2 border-gray-300 focus:border-[#0070f3] focus:ring-0" style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }} />
                        <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 pointer-events-none bg-white px-1
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
                            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600">
                          Password
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <div>
                        <Input {...field} type="password" placeholder=" " className="peer placeholder-transparent shadow-none border-2 border-gray-300 focus:border-[#0070f3] focus:ring-0" style={{ boxShadow: 'none', borderColor: field.value ? '#0070f3' : undefined }} />
                        <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200 pointer-events-none bg-white px-1
                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
                            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-600
                            peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-blue-600">
                          Confirm Password
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell us about you</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Hello my name..."
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/login" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Login
                </Button>
              </Link>
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading}
                style={{ backgroundColor: isLoading ? '#ccc' : '#0070f3', color: '#fff' }}
              >
                {isLoading ? 'Creating Account...' : 'Register'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
