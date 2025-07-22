import Link from 'next/link';
import Header from '@/components/ui/header';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-muted/30 rounded-full p-6 mb-6">
            <Search className="w-12 h-12 text-muted-foreground" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            The page you&apos;re looking for doesn&apos;t exist or the cryptocurrency was not found.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Coins
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}