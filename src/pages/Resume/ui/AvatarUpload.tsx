import { Avatar, Upload } from 'antd';
import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { uploadResumePhoto, selectResume } from '@/entities/Resume';
import styles from './Resume.module.scss';

export const AvatarUpload = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const resume = useAppSelector(selectResume);

  const displayName =
    [resume?.firstName, resume?.lastName, resume?.middleName].filter(Boolean).join(' ') ||
    t('common.notSpecified');

  const handleUpload = async (file: File) => {
    await dispatch(uploadResumePhoto(file)).unwrap();
  };

  return (
    <Upload
      accept="image/*"
      showUploadList={false}
      beforeUpload={(file) => {
        void handleUpload(file);
        return false;
      }}
    >
      <div className={styles.avatarButton} aria-label={t('settings.avatarChange')}>
        {resume?.photo ? (
          <Avatar src={resume.photo} size={64} alt={displayName} />
        ) : (
          <Avatar size={64} icon={<UserOutlined />} className={styles.avatarFallback} />
        )}
        <span className={styles.avatarOverlay}>
          <CameraOutlined />
        </span>
      </div>
    </Upload>
  );
};

export default AvatarUpload;