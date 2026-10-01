import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Collapse, Typography } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectCurrentUser } from "@/entities/User";
import {
  fetchSections,
  selectSectionsWithCompletion,
  selectSectionTopicLoading,
  selectSectionTopicError,
} from "@/entities/SectionTopic";
import { rgbaFromHex } from "@/shared/lib/color/hexToRgb";
import styles from "./SectionsCollapse.module.scss";

const { Title, Text } = Typography;

export type StudyPage = "documentation" | "tests";

interface SectionsCollapseProps {
  title: string;
  page: StudyPage;
}

const SectionsCollapse = ({ title, page }: SectionsCollapseProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const user = useAppSelector(selectCurrentUser);
  const sections = useAppSelector(selectSectionsWithCompletion);
  const loading = useAppSelector(selectSectionTopicLoading);
  const error = useAppSelector(selectSectionTopicError);

  const [activeKey, setActiveKey] = useState<string[]>([]);

  useEffect(() => {
    if (user?.position.title) {
      dispatch(
        fetchSections({ type: user.position.title, page: 1, limit: 10 })
      );
    }
  }, [dispatch, user?.position.title]);

  const handleChange = useCallback((keys: string | string[]) => {
    setActiveKey(Array.isArray(keys) ? keys : [keys]);
  }, []);

  const items = useMemo(
    () =>
      sections.map((section) => ({
        key: section.id,
        label: (
          <div
            className={styles.sectionHeader}
            style={{
              backgroundColor: rgbaFromHex(section.color, 0.2),
              borderColor: section.color,
            }}
          >
            <Text strong>{section.title}</Text>
            {activeKey.includes(section.id) ? (
              <UpOutlined className={styles.icon} />
            ) : (
              <DownOutlined className={styles.icon} />
            )}
          </div>
        ),
        children: <TopicsList page={page} sectionId={section.id} />,
      })),
    [sections, activeKey, page]
  );

  return (
    <div className={styles.container}>
      <Title level={2}>{title}</Title>

      {loading && <Text>{t("common.loading")}</Text>}
      {error && (
        <Text type="danger">
          {t("common.error")}: {error}
        </Text>
      )}

      <Collapse
        accordion
        className={styles.collapse}
        activeKey={activeKey}
        onChange={handleChange}
        items={items}
      />
    </div>
  );
};

interface TopicsListProps {
  page: StudyPage;
  sectionId: string;
}

const TopicsList = ({ page, sectionId }: TopicsListProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const topics = useSectionTopics(sectionId);

  if (topics.length === 0) {
    return <Text>{t("study.noTopics")}</Text>;
  }

  return (
    <div className={styles.topicList}>
      {topics.map((topic) => (
        <Card
          key={topic.id}
          hoverable
          className={styles.topicCard}
          onClick={() => navigate(`/study/${page}/${topic.id}`)}
        >
          <Text strong>{topic.title}</Text>
        </Card>
      ))}
    </div>
  );
};

const useSectionTopics = (_sectionId: string) => {
  return [] as Array<{ id: string; title: string }>;
};

export default SectionsCollapse;
