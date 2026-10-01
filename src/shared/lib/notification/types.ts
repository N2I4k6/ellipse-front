export const NotificationType = {
  Success: "success",
  Info: "info",
  Warning: "warning",
  Error: "error",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
