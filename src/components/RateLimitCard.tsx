'use client';

import { useEffect, useState } from 'react';
import type { RateLimitInfo } from '@/types';

interface RateLimitCardProps {
  rateLimitInfo: RateLimitInfo;
}

export default function RateLimitCard({ rateLimitInfo }: RateLimitCardProps) {
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = rateLimitInfo.resetTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeUntilReset('Resetting...');
        return;
      }

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      
      setTimeUntilReset(`${minutes}:${remainingSeconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [rateLimitInfo.resetTime]);

  const usagePercentage = ((rateLimitInfo.requestsPerMinute - rateLimitInfo.requestsRemaining) / rateLimitInfo.requestsPerMinute) * 100;
  const concurrentPercentage = (rateLimitInfo.concurrentRequests / rateLimitInfo.maxConcurrentRequests) * 100;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Rate Limits</h2>
      
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Requests per Minute</span>
            <span className="text-sm text-gray-600">
              {rateLimitInfo.requestsRemaining} / {rateLimitInfo.requestsPerMinute}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full transition-all ${usagePercentage > 80 ? 'bg-red-500' : usagePercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Resets in {timeUntilReset}</p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Concurrent Requests</span>
            <span className="text-sm text-gray-600">
              {rateLimitInfo.concurrentRequests} / {rateLimitInfo.maxConcurrentRequests}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full transition-all ${concurrentPercentage > 80 ? 'bg-red-500' : concurrentPercentage > 50 ? 'bg-yellow-500' : 'bg-blue-500'}`}
              style={{ width: `${concurrentPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
