import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { updateUsername, selectCurrentUser } from '@/entities/User';
import { truncate } from '@/shared/lib/string/truncate';
import { extractErrorMessage } from '@/shared/lib/errors';
import { openNotification, NotificationType } from '@/shared/lib/notification';
import styles from './Settings.module.scss';

const { Text } = Typography;

const USERNAME_MAX_DISPLAY = 10;

interface UserNameFormValues {
  username: string | null;
}

const UserNameForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [isEditing, setIsEditing] = useState(false);

  const schema = useMemo(
    () =>
      yup.object({
        username: yup
          .string()
          .min(3, 'validation.usernameMin')
          .nullable()
          .defined()
          .transform((value, originalValue) =>
            originalValue === '' ? null : value,
          ),
      }),
    [],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserNameFormValues>({
    resolver: yupResolver(schema) as Resolver<UserNameFormValues>,
    defaultValues: { username: user?.username ?? '' },
  });

  useEffect(() => {
    reset({ username: user?.username ?? '' });
  }, [user?.username, reset]);

  const displayName =
    user?.username ??
    user?.email?.charAt(0).toUpperCase() ??
    t('messages.guest');

  const handleSubmitForm = useCallback(
    async (values: UserNameFormValues) => {
      try {
        await dispatch(updateUsername(values.username)).unwrap();
        setIsEditing(false);
        openNotification({
          type: NotificationType.Success,
          title: t('common.success'),
          description: t('settings.userNameSuccess'),
        });
      } catch (error) {
        openNotification({
          type: NotificationType.Error,
          title: t('common.error'),
          description: extractErrorMessage(error, t('settings.userNameError')),
        });
      }
    },
    [dispatch, t],
  );

  const handleCancel = useCallback(() => {
    reset({ username: user?.username ?? '' });
    setIsEditing(false);
  }, [reset, user?.username]);

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className={styles.usernameWrapper}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={field.value ?? ''}
              autoFocus
              className={styles.styledInput}
              placeholder={t('settings.userNamePlaceholder')}
              status={errors.username ? 'error' : undefined}
              onPressEnter={() => void handleSubmit(handleSubmitForm)()}
            />
          )}
        />
        <Button
          type="text"
          icon={<CheckOutlined />}
          onClick={() => void handleSubmit(handleSubmitForm)()}
          loading={isSubmitting}
          aria-label={t('common.save')}
        />
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleCancel}
          aria-label={t('common.cancel')}
        />
        {errors.username?.message && (
          <Text type="danger" className={styles.error}>
            {t(errors.username.message)}
          </Text>
        )}
      </form>
    );
  }

  return (
    <div className={styles.usernameContainer}>
      <Text
        strong
        className={styles.username}
        onClick={() => setIsEditing(true)}
      >
        {truncate(displayName, USERNAME_MAX_DISPLAY)}
      </Text>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsEditing(true)}
        aria-label={t('common.edit')}
        className={styles.editIcon}
      />
    </div>
  );
};

export default UserNameForm;