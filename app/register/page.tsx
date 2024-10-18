"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast"

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Registration successful. Please check your email for verification.",
      })
      router.push('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleRegister} className="space-y-4 w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">Register</Button>
      </form>
    </div>
  );
}