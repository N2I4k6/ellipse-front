import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";

import { openNotification, NotificationType } from "@/shared/lib/notification";

interface SocketNotificationPayload {
  type: string;
  title: string;
  message: string;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? "";

const isNotificationType = (value: string): value is NotificationType =>
  Object.values(NotificationType).includes(value as NotificationType);

export const useNotificationSocket = (
  userId: string | number | undefined
): void => {
  useEffect(() => {
    if (!userId) return;

    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    const handleConnect = () => {
      socket.emit("register", userId);
    };

    const handleNotification = (payload: SocketNotificationPayload) => {
      if (!isNotificationType(payload.type)) {
        console.warn("[socket] unknown notification type:", payload.type);
        return;
      }

      openNotification({
        type: payload.type,
        title: payload.title,
        description: payload.message,
      });
    };

    const handleConnectError = (err: Error) => {
      console.error("[socket] connection error:", err.message);
    };

    socket.on("connect", handleConnect);
    socket.on("notification", handleNotification);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("notification", handleNotification);
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
    };
  }, [userId]);
};
