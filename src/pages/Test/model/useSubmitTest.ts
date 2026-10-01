import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/app/store/hooks';
import { submitTestAnswers, type Test, type TestAnswer } from '@/entities/Test';
import { fetchCurrentUser } from '@/entities/User';
import { openNotification, NotificationType } from '@/shared/lib/notification';

interface UseSubmitTestResult {
  submit: () => Promise<void>;
}

export const useSubmitTest = (
  test: Test | null,
  answers: TestAnswer[],
  isComplete: boolean,
  onSuccess?: () => void,
): UseSubmitTestResult => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const submit = useCallback(async () => {
    if (!test || !isComplete) {
      openNotification({
        type: NotificationType.Warning,
        title: t('common.warning'),
        description: t('tests.answerAll'),
      });
      return;
    }

    try {
      const result = await dispatch(
        submitTestAnswers({ id: test.id, answers }),
      ).unwrap();

      if (test.isGeneral && result.score === result.totalQuestions) {
        await dispatch(fetchCurrentUser()).unwrap();
        openNotification({
          type: NotificationType.Success,
          title: t('common.success'),
          description: t('tests.passed'),
        });
      }

      onSuccess?.();
    } catch (err) {
      console.error('[useSubmitTest] failed', err);
    }
  }, [dispatch, test, answers, isComplete, t, onSuccess]);

  return { submit };
};