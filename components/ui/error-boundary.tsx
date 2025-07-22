'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ({ error, retry }: { error: Error; retry: () => void }) => ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface ErrorFallbackProps {
  error: Error;
  retry: () => void;
}

function DefaultErrorFallback({ error, retry }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-destructive mb-2">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-4 text-sm">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={retry}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback({ error: this.state.error, retry: this.retry });
      }
      return <DefaultErrorFallback error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}