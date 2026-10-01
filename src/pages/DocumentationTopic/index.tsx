import { useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Card, Spin } from 'antd';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from 'html-react-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  prism,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  fetchTopicById,
  fetchSectionById,
  updateTopic,
  selectCurrentTopic,
  selectCurrentSection,
  selectSectionTopicLoading,
  selectSectionTopicError,
} from '@/entities/SectionTopic';
import { useTheme } from '@/app/providers/ThemeContext';
import { rgbaFromHex } from '@/shared/lib/color/hexToRgb';
import { getNodeText } from '@/shared/lib/html/getNodeText';
import { ROUTES } from '@/shared/config/routes';
import styles from './ui/DocumentationTopic.module.scss';

const { Title, Text, Paragraph } = Typography;

const FALLBACK_SECTION_COLOR = '#1890ff';
const DEFAULT_CONTENT = '<p></p>';

const DocumentationTopicPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { mode } = useTheme();
  const topic = useAppSelector(selectCurrentTopic);
  const section = useAppSelector(selectCurrentSection);
  const loading = useAppSelector(selectSectionTopicLoading);
  const error = useAppSelector(selectSectionTopicError);

  useEffect(() => {
    if (id) {
      dispatch(fetchTopicById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (topic?.sections[0]) {
      dispatch(fetchSectionById(topic.sections[0]));
    }
  }, [dispatch, topic?.sections]);

  const handleToggleComplete = useCallback(() => {
    if (!topic) return;
    dispatch(
      updateTopic({
        id: topic.id,
        data: { completed: !topic.completed },
      }),
    );
  }, [dispatch, topic]);

  const options: HTMLReactParserOptions = useMemo(
    () => ({
      replace: (domNode) => {
        if (!(domNode instanceof Element)) return domNode;

        if (domNode.name === 'h2') {
          return (
            <Title level={3}>
              {domToReact(domNode.children as DOMNode[], options)}
            </Title>
          );
        }
        if (domNode.name === 'p') {
          return (
            <Paragraph>
              {domToReact(domNode.children as DOMNode[], options)}
            </Paragraph>
          );
        }
        if (
          domNode.name === 'pre' &&
          domNode.children[0] instanceof Element &&
          domNode.children[0].name === 'code'
        ) {
          const codeContent = getNodeText(domNode.children[0]).trim();
          return (
            <SyntaxHighlighter
              language="javascript"
              style={mode === 'dark' ? vscDarkPlus : prism}
              customStyle={{ margin: '10px 0', borderRadius: 5 }}
            >
              {codeContent}
            </SyntaxHighlighter>
          );
        }
        return domNode;
      },
    }),
    [mode],
  );

  if (loading) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <Text type="danger">
          {t('common.error')}: {error}
        </Text>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className={styles.center}>
        <Text>{t('study.topicNotFound')}</Text>
      </div>
    );
  }

  const sectionColor = section?.color ?? FALLBACK_SECTION_COLOR;

  return (
    <div className={styles.container}>
      <Card
        className={styles.topicCard}
        style={{
          backgroundColor: rgbaFromHex(sectionColor, 0.2),
          borderColor: sectionColor,
        }}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(ROUTES.private.documentation)}
              className={styles.backButton}
            >
              {t('common.goBack')}
            </Button>
          </div>
          <div className={styles.headerRight}>
            <Title level={2} className={styles.title}>
              {topic.title}
            </Title>
            {topic.completed && (
              <Text className={styles.completedText}>
                {t('study.topicStudied')}
              </Text>
            )}
          </div>
        </div>

        <div className={styles.contentBlock}>
          {parse(topic.text || DEFAULT_CONTENT, options)}
        </div>

        <div className={styles.actions}>
          <Button icon={<CheckOutlined />} onClick={handleToggleComplete}>
            {topic.completed
              ? t('study.markUnstudied')
              : t('study.markStudied')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DocumentationTopicPage;