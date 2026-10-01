import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { deleteTestResults } from "@/entities/Test";

export const useRestartCooldown = (
  testId: string | undefined,
  remainingMinutes: number | null
): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!testId || !remainingMinutes) return;

    const ms = remainingMinutes * 60 * 1000;
    const timer = setTimeout(() => {
      void dispatch(deleteTestResults(testId));
    }, ms);

    return () => clearTimeout(timer);
  }, [dispatch, testId, remainingMinutes]);
};
