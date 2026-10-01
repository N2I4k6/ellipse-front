import { Avatar, Upload, message } from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { uploadAvatar, selectCurrentUser } from "@/entities/User";
import { extractErrorMessage } from "@/shared/lib/errors";
import styles from "./Settings.module.scss";

const AVATAR_FALLBACK_COLOR = "#de54ce";

const UserAvatar = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const displayName =
    user?.username ??
    user?.email?.charAt(0).toUpperCase() ??
    t("messages.guest");

  const handleAvatarChange = async (file: File) => {
    try {
      await dispatch(uploadAvatar(file)).unwrap();
      void message.success(t("settings.avatarSuccess"));
    } catch (error) {
      void message.error(extractErrorMessage(error, t("settings.avatarError")));
    }
  };

  return (
    <div className={styles.avatarWrapper}>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          void handleAvatarChange(file);
          return false;
        }}
      >
        <div
          className={styles.avatarButton}
          aria-label={t("settings.avatarChange")}
        >
          {user?.avatar ? (
            <Avatar src={user.avatar} size={64} alt={displayName} />
          ) : (
            <Avatar
              size={64}
              style={{ backgroundColor: AVATAR_FALLBACK_COLOR }}
              icon={<UserOutlined />}
            />
          )}
          <span className={styles.avatarOverlay}>
            <CameraOutlined />
          </span>
        </div>
      </Upload>
    </div>
  );
};

export default UserAvatar;
