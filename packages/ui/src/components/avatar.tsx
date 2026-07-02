import type * as React from 'react';

import { cn } from '../lib/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string | null;
  alt?: string;
  /** Initials shown when no image is available. */
  fallback: string;
}

/** Circular avatar with an initials fallback. */
export function Avatar({ src, alt, fallback, className, ...props }: AvatarProps) {
  return (
    <span
      className={cn(
        'border-border bg-surface text-foreground inline-flex size-8 items-center justify-center overflow-hidden rounded-full border text-xs font-semibold',
        className,
      )}
      {...props}
    >
      {src ? <img src={src} alt={alt ?? ''} className="size-full object-cover" /> : fallback}
    </span>
  );
}
