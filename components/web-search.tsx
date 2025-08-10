import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  domain?: string;
  pageAge?: string;
}

interface SearchResultsWidgetProps {
  results: SearchResult[];
  query?: string;
  isLoading?: boolean;
  className?: string;
}

export function SearchResultsWidget({
  results,
  query,
  isLoading = false,
  className = '',
}: SearchResultsWidgetProps) {
  if (isLoading) {
    return (
      <div
        className={`w-full rounded-lg border bg-card text-card-foreground shadow-sm p-4 ${className}`}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="size-4 text-muted-foreground animate-spin" />
          <span className="text-sm text-muted-foreground">Searching...</span>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div
        className={`w-full max-w-full rounded-lg border bg-card text-card-foreground shadow-sm p-3 sm:p-4 ${className}`}
      >
        <div className="flex items-center justify-between w-full mb-3 sm:mb-4 gap-2">
          <div className="flex items-center justify-start gap-2 min-w-0 flex-1">
            <Globe className="size-4 text-muted-foreground shrink-0" />
            <span className="text-xs sm:text-sm font-medium truncate">
              Search results for `{query}`
            </span>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            (0 results)
          </span>
        </div>
        <div className="text-center text-muted-foreground">
          <p className="text-xs">No search results found</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-full rounded-lg pb-2 border bg-card text-card-foreground shadow-sm ${className}`}
    >
      <div className="p-3 sm:p-4 border-b">
        <div className="flex items-center justify-start gap-2">
          <Globe className="size-4 text-muted-foreground shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">
            Search results for `{query}`
          </span>
        </div>
      </div>
      <div className="overflow-y-auto max-h-56">
        <AnimatePresence>
          {results.map((result) => {
            const domain = getDomain(result.url);
            const faviconUrl = domain
              ? `https://www.google.com/s2/favicons?domain=${domain}`
              : undefined;

            return (
              <motion.div
                key={result.url}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="group border-b last:border-b-0 px-3 py-2 sm:px-4 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Avatar className="size-4 shrink-0 mt-0.5">
                      <AvatarImage src={faviconUrl} />
                      <AvatarFallback>SR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs sm:text-sm font-medium text-primary hover:underline leading-4 sm:leading-5"
                      >
                        <span className="line-clamp-2">{result.title}</span>
                      </Link>
                    </div>
                    <ExternalLink className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getDomain(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
}
