import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import {
  deleteTestResults,
  fetchTestById,
  clearTestResults,
  type Test,
} from "@/entities/Test";

interface UseTestRestartResult {
  restart: () => Promise<void>;
}

export const useTestRestart = (
  test: Test | null,
  resetAnswers: () => void
): UseTestRestartResult => {
  const dispatch = useAppDispatch();

  const restart = useCallback(async () => {
    if (!test) return;

    try {
      await dispatch(deleteTestResults(test.id)).unwrap();
      dispatch(clearTestResults());
      resetAnswers();
      void dispatch(fetchTestById(test.id));
    } catch (err) {
      console.error("[useTestRestart] failed", err);
    }
  }, [dispatch, test, resetAnswers]);

  return { restart };
};
