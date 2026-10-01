import { Card } from "antd";
import type { ReactNode } from "react";
import styles from "./MainContent.module.scss";

interface MainContentProps {
  children: ReactNode;
}

export const MainContent = ({ children }: MainContentProps) => (
  <div className={styles.container}>
    <Card className={styles.content} variant="borderless">
      {children}
    </Card>
  </div>
);

export default MainContent;
