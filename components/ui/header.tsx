'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './theme-toggle';
import { TrendingUp, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </div>
            {/* Mobile-first: Show abbreviated text on mobile, full text on sm+ */}
            <div className="block">
              <h1 className="font-bold text-lg text-foreground sm:text-xl">
                <span className="sm:hidden">Crypto</span>
                <span className="hidden sm:block">Crypto Dashboard</span>
              </h1>
              <p className="hidden sm:block text-xs text-muted-foreground">
                Real-time cryptocurrency tracker
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile & Desktop Controls */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button - Mobile First: show by default, hide on md+ */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile Navigation Menu - Mobile First: visible when open, hidden on md+ */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav 
              id="mobile-navigation-menu"
              className="container mx-auto px-4 py-4"
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/search" 
                  className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Search
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
}