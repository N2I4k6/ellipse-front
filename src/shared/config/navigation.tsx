import {
  BarChartOutlined,
  TeamOutlined,
  BookOutlined,
  FormOutlined,
  SnippetsOutlined,
  FileProtectOutlined,
  BellOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";
import { ROUTES } from "@/shared/config/routes";

export interface NavItem {
  key: string;
  labelKey: string;
  icon: ReactNode;
  showInFooter?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    key: ROUTES.private.statistics,
    labelKey: "nav.statistics",
    icon: <BarChartOutlined />,
    showInFooter: true,
  },
  {
    key: ROUTES.private.companies,
    labelKey: "nav.companies",
    icon: <TeamOutlined />,
    showInFooter: true,
  },
  {
    key: ROUTES.private.study,
    labelKey: "nav.study",
    icon: <BookOutlined />,
    showInFooter: true,
  },
  {
    key: ROUTES.private.coverLetter,
    labelKey: "nav.coverLetter",
    icon: <FormOutlined />,
  },
  {
    key: ROUTES.private.calendar,
    labelKey: "nav.calendar",
    icon: <SnippetsOutlined />,
  },
  {
    key: ROUTES.private.resume,
    labelKey: "nav.resume",
    icon: <FileProtectOutlined />,
  },
  {
    key: ROUTES.private.notifications,
    labelKey: "nav.notifications",
    icon: <BellOutlined />,
  },
  {
    key: ROUTES.private.messages,
    labelKey: "nav.messages",
    icon: <MessageOutlined />,
  },
];

export const FOOTER_NAV_ITEMS = NAV_ITEMS.filter((item) => item.showInFooter);
