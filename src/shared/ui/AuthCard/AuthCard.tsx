import { Card } from "antd";
import type { ReactNode } from "react";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import styles from "./AuthCard.module.scss";

interface AuthCardProps {
  title: string;
  children: ReactNode;
}

export const AuthCard = ({ title, children }: AuthCardProps) => {
  const isMobile = useIsMobile();

  return (
    <Card title={title} className={isMobile ? styles.mobile : undefined}>
      {children}
    </Card>
  );
};

export default AuthCard;
