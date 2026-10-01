import { useCallback, useRef, useState } from "react";
import { Modal, Button, Typography, Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./OnboardingModal.module.scss";

const { Title, Paragraph } = Typography;

interface OnboardingModalProps {
  visible: boolean;
  onClose: () => void;
}

const SLIDES = [
  {
    titleKey: "onboarding.welcome.title",
    descriptionKey: "onboarding.welcome.description",
    image: "/ellipse.png",
  },
  {
    titleKey: "onboarding.statistics.title",
    descriptionKey: "onboarding.statistics.description",
    image: "/statistics.png",
  },
  {
    titleKey: "onboarding.companies.title",
    descriptionKey: "onboarding.companies.description",
    image: "/companies.png",
  },
  {
    titleKey: "onboarding.study.title",
    descriptionKey: "onboarding.study.description",
    image: "/study.png",
  },
  {
    titleKey: "onboarding.coverLetter.title",
    descriptionKey: "onboarding.coverLetter.description",
    image: "/cover-letter.png",
  },
  {
    titleKey: "onboarding.calendar.title",
    descriptionKey: "onboarding.calendar.description",
    image: "/calendar.png",
  },
  {
    titleKey: "onboarding.resume.title",
    descriptionKey: "onboarding.resume.description",
    image: "/resume.png",
  },
  {
    titleKey: "onboarding.notifications.title",
    descriptionKey: "onboarding.notifications.description",
    image: "/notifications.png",
  },
  {
    titleKey: "onboarding.messages.title",
    descriptionKey: "onboarding.messages.description",
    image: "/messages.png",
  },
];

export const OnboardingModal = ({ visible, onClose }: OnboardingModalProps) => {
  const { t } = useTranslation();
  const carouselRef = useRef<CarouselRef>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isFirst = currentSlide === 0;
  const isLast = currentSlide === SLIDES.length - 1;

  const handleNext = useCallback(() => carouselRef.current?.next(), []);
  const handlePrev = useCallback(() => carouselRef.current?.prev(), []);

  const handleClose = useCallback(() => {
    setCurrentSlide(0);
    onClose();
  }, [onClose]);

  const handlePrimaryAction = isLast ? handleClose : handleNext;

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      closeIcon={<CloseOutlined />}
      className={styles.onboardingModal}
      centered
      width={600}
    >
      <div className={styles.carouselContainer}>
        <Carousel ref={carouselRef} afterChange={setCurrentSlide} dots={false}>
          {SLIDES.map((slide, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={slide.image}
                alt={t(slide.titleKey)}
                className={styles.image}
              />
              <Title level={3} className={styles.title}>
                {t(slide.titleKey)}
              </Title>
              <Paragraph className={styles.description}>
                {t(slide.descriptionKey)}
              </Paragraph>
            </div>
          ))}
        </Carousel>
        <div className={styles.navigation}>
          <Button
            icon={<LeftOutlined />}
            onClick={handlePrev}
            disabled={isFirst}
            className={styles.navButton}
          >
            {t("common.back")}
          </Button>
          <div className={styles.dots}>
            {SLIDES.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.activeDot : ""
                }`}
              />
            ))}
          </div>
          <Button
            icon={<RightOutlined />}
            onClick={handlePrimaryAction}
            className={styles.navButton}
            type={isLast ? "primary" : "default"}
          >
            {isLast ? t("common.finish") : t("common.next")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OnboardingModal;
