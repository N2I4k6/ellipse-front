import type { ReactNode } from 'react';
import Logo from '@/assets/logo.svg?react';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className={styles.container}>
    <div className={styles.left}>
      <div className={styles.leftContent}>
        <Logo className={styles.logo} />
        <h1 className={styles.brand}>ELLIPSE</h1>
      </div>
    </div>
    <div className={styles.right}>{children}</div>
  </div>
);

export default AuthLayout;