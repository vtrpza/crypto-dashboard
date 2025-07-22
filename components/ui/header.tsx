import Link from 'next/link';
import ThemeToggle from './theme-toggle';
import { TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-foreground">Crypto Dashboard</h1>
              <p className="text-xs text-muted-foreground">Real-time cryptocurrency tracker</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/search" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Search
            </Link>
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}