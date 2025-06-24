'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const neoCardVariants = cva(
  'neo-card rounded-lg text-card-foreground',
  {
    variants: {
      variant: {
        default: 'bg-white',
        yellow: 'neo-card-yellow',
        white: 'bg-white',
      },
      hoverable: {
        true: 'neo-card-hover cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      hoverable: false,
    },
  }
);

export interface NeoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neoCardVariants> {
  hoverable?: boolean;
}

const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  ({ className, variant, hoverable, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(neoCardVariants({ variant, hoverable, className }))}
      {...props}
    />
  )
);
NeoCard.displayName = 'NeoCard';

const NeoCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
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
    className={cn('neo-header text-2xl font-black leading-none tracking-tight', className)}
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
    className={cn('text-sm font-semibold text-muted-foreground', className)}
    {...props}
  />
));
NeoCardDescription.displayName = 'NeoCardDescription';

const NeoCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
NeoCardContent.displayName = 'NeoCardContent';

const NeoCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
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
  neoCardVariants,
};