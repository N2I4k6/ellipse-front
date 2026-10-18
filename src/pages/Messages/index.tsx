import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  AutoComplete,
  Button,
  Typography,
  Space,
  Tag,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  searchUsers,
  subscribeToUser,
  unsubscribeFromUser,
  setSearchedUsers,
  setSubscribedUsers,
  selectCurrentUser,
  selectSearchedUsers,
  selectSubscribedUsers,
  selectUserLoading,
  type User,
  type UserLevel,
} from "@/entities/User";
import styles from "./ui/Messages.module.scss";

const { Title, Text } = Typography;

const TAG_COLORS: Record<string, string> = {
  Junior: "green",
  Middle: "blue",
  Senior: "purple",
};

const SEARCH_MIN_LENGTH = 3;

const MessagesPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);
  const searchedUsers = useAppSelector(selectSearchedUsers);
  const subscribedUsers = useAppSelector(selectSubscribedUsers);
  const loading = useAppSelector(selectUserLoading);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    const subs = currentUser.subscriptions;

    if (subs.length > 0) {
      dispatch(searchUsers({ ids: subs }));
    } else {
      dispatch(setSubscribedUsers([]));
    }
  }, [dispatch, currentUser?.subscriptions]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
      if (value.length >= SEARCH_MIN_LENGTH) {
        dispatch(searchUsers({ name: value }));
      } else {
        dispatch(setSearchedUsers([]));
      }
    },
    [dispatch]
  );

  const subscribedIds = useMemo(
    () => new Set(currentUser?.subscriptions ?? []),
    [currentUser?.subscriptions]
  );

  const options = useMemo(
    () =>
      searchedUsers.map((searchedUser) => {
        const isSubscribed = subscribedIds.has(searchedUser.id);

        return {
          value: searchedUser.username ?? searchedUser.email,
          key: searchedUser.id,
          label: (
            <UserSearchOption
              user={searchedUser}
              isSubscribed={isSubscribed}
              loading={loading}
            />
          ),
        };
      }),
    [searchedUsers, subscribedIds, loading]
  );

  return (
    <div className={styles.container}>
      <Title level={4}>{t("messages.title")}</Title>

      <AutoComplete
        className={styles.search}
        placeholder={t("messages.searchByName")}
        value={searchText}
        onSearch={handleSearch}
        options={options}
        allowClear
      />

      <Space direction="vertical" size="middle" className={styles.list}>
        {subscribedUsers.map((subUser) => (
          <UserCard key={subUser.id} user={subUser} loading={loading} />
        ))}

        {subscribedUsers.length === 0 && !loading && (
          <Text type="secondary">{t("messages.noSubscriptions")}</Text>
        )}
      </Space>
    </div>
  );
};

interface UserSearchOptionProps {
  user: User;
  isSubscribed: boolean;
  loading: boolean;
}

const UserSearchOption = ({
  user,
  isSubscribed,
  loading,
}: UserSearchOptionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleToggleSubscription = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSubscribed) {
      dispatch(unsubscribeFromUser(user.id));
    } else {
      dispatch(subscribeToUser(user.id));
    }
  };

  return (
    <Space className={styles.optionRow}>
      <Space>
        <Avatar
          icon={<UserOutlined />}
          src={user.avatar}
          size={48}
          className={styles.avatar}
          alt={user.username ?? user.email}
        />
        <div className={styles.userInfo}>
          <Text strong>{user.username ?? user.email}</Text>
          <div>
            <Text type="secondary">
              {user.position.title} ({t(`messages.levels.${user.position.level}`)})
            </Text>
          </div>
        </div>
      </Space>
      <Button
        type={isSubscribed ? "default" : "primary"}
        onClick={handleToggleSubscription}
        onMouseDown={(e) => e.preventDefault()}
        disabled={loading}
      >
        {isSubscribed ? t("messages.unsubscribe") : t("messages.subscribe")}
      </Button>
    </Space>
  );
};

interface UserCardProps {
  user: User;
  loading: boolean;
}

const UserCard = ({ user, loading }: UserCardProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleUnsubscribe = useCallback(() => {
    dispatch(unsubscribeFromUser(user.id));
  }, [dispatch, user.id]);

  return (
    <Card className={styles.userCard}>
      <Space className={styles.userCardRow}>
        <Space size="middle">
          <Avatar
            icon={<UserOutlined />}
            src={user.avatar}
            size={48}
            className={styles.avatar}
            alt={user.username ?? user.email}
          />
          <div className={styles.userInfo}>
            <Text strong>{user.username ?? user.email}</Text>
            <div>
              <Text type="secondary">
                {user.position.title} ({t(`messages.levels.${user.position.level}`)})
              </Text>
            </div>
            {/* Добавил .toLowerCase() для безопасности и приведения типа */}
            <Tag color={TAG_COLORS[user.position.level.toLowerCase() as UserLevel] ?? TAG_COLORS[user.position.level]}>
              {t(`messages.levels.${user.position.level}`)}
            </Tag>
          </div>
        </Space>
        <Button onClick={handleUnsubscribe} disabled={loading}>
          {t("messages.unsubscribe")}
        </Button>
      </Space>
    </Card>
  );
};

export default MessagesPage;