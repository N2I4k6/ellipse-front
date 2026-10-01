import { Card, Radio, Space } from "antd";
import type { TestQuestion } from "@/entities/Test";
import { HtmlContent } from "@/shared/ui/HtmlContent";
import styles from "./Test.module.scss";

interface QuestionCardProps {
  question: TestQuestion;
  index: number;
  selectedOption?: number;
  disabled: boolean;
  onAnswer: (questionId: string, selectedOption: number) => void;
}

export const QuestionCard = ({
  question,
  index,
  selectedOption,
  disabled,
  onAnswer,
}: QuestionCardProps) => {
  return (
    <Card className={styles.questionCard}>
      <HtmlContent html={`${index + 1}. ${question.text}`} />

      <Radio.Group
        value={selectedOption}
        disabled={disabled}
        className={styles.radioGroup}
        onChange={(e) => {
          if (question.id) onAnswer(question.id, e.target.value);
        }}
      >
        <Space direction="vertical">
          {question.options.map((option, optionIndex) => (
            <Radio key={optionIndex} value={optionIndex}>
              {option.text}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Card>
  );
};
