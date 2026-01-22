'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950">
        <div className="text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mx-auto">
            <span className="text-3xl font-bold text-white">AI</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500" style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-pink-500" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
