import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import {
  fetchTestById,
  fetchGeneralTest,
  fetchTestResults,
  clearCurrentTest,
  clearTestResults,
} from '@/entities/Test';

export const useTestLoader = (id: string | undefined): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      void dispatch(fetchTestById(id));
      void dispatch(fetchTestResults(id));
    } else {
      void dispatch(fetchGeneralTest());
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentTest());
      dispatch(clearTestResults());
    };
  }, [dispatch]);
};