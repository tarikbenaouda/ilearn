import React from 'react';
import { cn } from '@/lib/utils';

interface LessonContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Full-height container for the lesson page.
 * - h-full fills the flex-1 main tag in AppShell
 * - overflow-hidden on the container — no page scroll
 * - relative so the floating footer can use absolute positioning
 */
export function LessonContainer({ children, className }: LessonContainerProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col h-full w-full bg-background overflow-hidden',
        className
      )}
      dir="rtl"
    >
      {children}
    </div>
  );
}
