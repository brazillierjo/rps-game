import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

const cx = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export const Button = ({ className, children, variant = 'primary', ...props }: ButtonProps) => (
  <button className={cx(styles.button, styles[variant], className)} {...props}>
    {children}
  </button>
);
