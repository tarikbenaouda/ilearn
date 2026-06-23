import React from 'react';
import { cn } from '@/lib/utils';

interface LessonContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Full-height container for the lesson page.
 * Uses h-full so it fills the main tag (which already has flex-1 in AppShell).
 * overflow-hidden ensures nothing spills out — no scroll.
 */
export function LessonContainer({ children, className }: LessonContainerProps) {
  return (
    <div
      className={cn(
        'flex flex-col h-full w-full bg-background overflow-hidden',
        className
      )}
      dir="rtl"
    >
      {children}
    </div>
  );
}
