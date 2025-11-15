import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'secondary' | 'outline';
};

const cx = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', ...props }, ref) => (
    <button ref={ref} className={cx(styles.button, styles[variant], className)} {...props}>
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
