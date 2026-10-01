import { useCallback, useEffect, useState } from "react";
import type { Test, TestAnswer } from "@/entities/Test";

interface UseTestAnswersResult {
  answers: TestAnswer[];
  isComplete: boolean;
  setAnswer: (questionId: string, selectedOption: number) => void;
  reset: () => void;
}

export const useTestAnswers = (test: Test | null): UseTestAnswersResult => {
  const [answers, setAnswers] = useState<TestAnswer[]>([]);

  useEffect(() => {
    setAnswers([]);
  }, [test?.id]);

  const setAnswer = useCallback(
    (questionId: string, selectedOption: number) => {
      setAnswers((prev) => {
        const existingIndex = prev.findIndex(
          (a) => a.questionId === questionId
        );
        if (existingIndex === -1) {
          return [...prev, { questionId, selectedOption }];
        }
        return prev.map((a, i) =>
          i === existingIndex ? { ...a, selectedOption } : a
        );
      });
    },
    []
  );

  const reset = useCallback(() => setAnswers([]), []);

  const isComplete = test ? answers.length === test.questions.length : false;

  return { answers, isComplete, setAnswer, reset };
};
