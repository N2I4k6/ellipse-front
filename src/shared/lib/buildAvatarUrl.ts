const API_URL = import.meta.env.VITE_API_URL ?? "";
const BASE_URL = API_URL.endsWith("/api")
  ? API_URL.replace(/\/api$/, "")
  : API_URL;

export const buildAvatarUrl = (
  avatar: string | null | undefined
): string | null => {
  if (!avatar) return null;
  if (avatar.startsWith("http://") || avatar.startsWith("https://"))
    return avatar;
  return `${BASE_URL}/${avatar.replace(/^\/+/, "")}`;
};
