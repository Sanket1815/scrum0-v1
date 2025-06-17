import * as React from 'react';
import { cn } from '@/lib/utils';

const NeoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'yellow' | 'white';
    hoverable?: boolean;
  }
>(({ className, variant = 'default', hoverable = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'neo-card p-6',
      {
        'neo-card-yellow': variant === 'yellow',
        'bg-white': variant === 'white',
        'neo-card-hover': hoverable,
      },
      className
    )}
    {...props}
  />
));
NeoCard.displayName = 'NeoCard';

const NeoCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 mb-4', className)}
    {...props}
  />
));
NeoCardHeader.displayName = 'NeoCardHeader';

const NeoCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('neo-header text-2xl font-bold leading-none', className)}
    {...props}
  />
));
NeoCardTitle.displayName = 'NeoCardTitle';

const NeoCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-700 font-medium', className)}
    {...props}
  />
));
NeoCardDescription.displayName = 'NeoCardDescription';

const NeoCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
NeoCardContent.displayName = 'NeoCardContent';

const NeoCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4 mt-4 border-t-2 border-black', className)}
    {...props}
  />
));
NeoCardFooter.displayName = 'NeoCardFooter';

export {
  NeoCard,
  NeoCardHeader,
  NeoCardFooter,
  NeoCardTitle,
  NeoCardDescription,
  NeoCardContent,
};