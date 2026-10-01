import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  fetchResume,
  fetchResumeOptions,
  selectResume,
  selectResumeOptions,
  selectResumeLoading,
  selectResumeError,
} from '@/entities/Resume';
import { toFormValues } from './transformResume';
import type { ResumeFormValues } from './schema';

interface UseResumeDataResult {
  resume: ReturnType<typeof selectResume>;
  options: ReturnType<typeof selectResumeOptions>;
  loading: boolean;
  error: string | null;
  formValues: ResumeFormValues;
}

export const useResumeData = (): UseResumeDataResult => {
  const dispatch = useAppDispatch();
  const resume = useAppSelector(selectResume);
  const options = useAppSelector(selectResumeOptions);
  const loading = useAppSelector(selectResumeLoading);
  const error = useAppSelector(selectResumeError);

  useEffect(() => {
    dispatch(fetchResumeOptions());
    dispatch(fetchResume());
  }, [dispatch]);

  const formValues = useMemo(() => toFormValues(resume), [resume]);

  return { resume, options, loading, error, formValues };
};