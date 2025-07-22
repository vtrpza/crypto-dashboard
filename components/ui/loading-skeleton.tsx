import { cn } from '@/lib/utils/cn';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'chart';
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({ 
  variant = 'card', 
  count = 1,
  className 
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (variant === 'card') {
    return (
      <div className={cn('space-y-4', className)}>
        {skeletons.map((_, index) => (
          <div key={index} className="bg-card border rounded-lg p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('space-y-2', className)}>
        {skeletons.map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 animate-pulse">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-muted rounded w-1/4"></div>
              <div className="h-2 bg-muted rounded w-1/6"></div>
            </div>
            <div className="w-20 h-3 bg-muted rounded"></div>
            <div className="w-16 h-3 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={cn('bg-card border rounded-lg p-6 animate-pulse', className)}>
        <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    );
  }

  return null;
}