import { useForm, Controller, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Spin, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useEffect, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  generateCoverLetter,
  selectCoverLetterLoading,
  selectCoverLetterError,
  selectLatestGeneratedLetter,
} from "@/entities/CoverLetter";
import { openNotification, NotificationType } from "@/shared/lib/notification";

import { coverLetterSchema, type CoverLetterFormData } from "./model/schema";
import styles from "./ui/CoverLetter.module.scss";

const { Title } = Typography;
const { Dragger } = Upload;

const CoverLetterPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectCoverLetterLoading);
  const error = useAppSelector(selectCoverLetterError);
  const generatedLetter = useAppSelector(selectLatestGeneratedLetter);

  useEffect(() => {
    openNotification({
      type: NotificationType.Warning,
      title: t("common.warning"),
      description: t("coverLetter.aiAgentNotConnected"),
    });
  }, [t]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CoverLetterFormData>({
    resolver: yupResolver(coverLetterSchema) as Resolver<CoverLetterFormData>,
    defaultValues: { vacancyUrl: "", resume: null },
  });

  const onSubmit = useCallback(
    (data: CoverLetterFormData) => {
      if (!data.resume) return;

      void dispatch(
        generateCoverLetter({
          vacancyUrl: data.vacancyUrl,
          resume: data.resume,
        })
      )
        .unwrap()
        .then(() => reset())
        .catch((err: unknown) => {
          console.error("[CoverLetter] generate failed", err);
        });
    },
    [dispatch, reset]
  );

  return (
    <div className={styles.container}>
      <Title level={4}>{t("coverLetter.generate")}</Title>

      {error && <Typography.Text type="danger">{error}</Typography.Text>}

      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className={styles.form}
      >
        <Form.Item
          label={t("coverLetter.vacancyUrl")}
          validateStatus={errors.vacancyUrl ? "error" : ""}
          help={
            errors.vacancyUrl?.message
              ? t(errors.vacancyUrl.message)
              : undefined
          }
        >
          <Controller
            name="vacancyUrl"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t("coverLetter.vacancyUrlPlaceholder")}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t("coverLetter.uploadResume")}
          validateStatus={errors.resume ? "error" : ""}
          help={errors.resume?.message ? t(errors.resume.message) : undefined}
        >
          <Controller
            name="resume"
            control={control}
            render={({ field }) => (
              <Dragger
                maxCount={1}
                accept=".pdf"
                beforeUpload={() => false}
                fileList={
                  field.value
                    ? [
                        {
                          uid: "-1",
                          name: field.value.name,
                          status: "done" as const,
                          originFileObj: field.value as never,
                        },
                      ]
                    : []
                }
                onChange={(info) => {
                  const file = info.fileList[0]?.originFileObj as
                    | File
                    | undefined;
                  field.onChange(file ?? null);
                }}
              >
                <p className={styles.uploadText}>
                  <UploadOutlined /> {t("coverLetter.clickOrDragPdf")}
                </p>
              </Dragger>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            {t("coverLetter.submit")}
          </Button>
        </Form.Item>
      </Form>

      {loading && <Spin size="large" />}

      {generatedLetter && (
        <div className={styles.letterContainer}>
          <Title level={5}>{t("coverLetter.generatedLetter")}</Title>
          <pre className={styles.letterText}>{generatedLetter}</pre>
        </div>
      )}
    </div>
  );
};

export default CoverLetterPage;
