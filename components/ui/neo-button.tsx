import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'neo-button inline-flex items-center justify-center whitespace-nowrap text-sm font-bold uppercase tracking-wide disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'neo-button-primary',
        secondary: 'neo-button-secondary',
        destructive: 'bg-red-500 text-white border-black hover:bg-red-600',
        outline: 'border-2 border-black bg-white text-black hover:bg-gray-100',
        ghost: 'border-0 shadow-none hover:bg-gray-100',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-11 px-4 py-2',
        lg: 'h-14 px-6 py-3 text-base',
        xl: 'h-16 px-8 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const NeoButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
NeoButton.displayName = 'NeoButton';

export { NeoButton, buttonVariants };