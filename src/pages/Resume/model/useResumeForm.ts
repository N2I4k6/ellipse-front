import { useCallback } from 'react';
import {
  useForm,
  useFieldArray,
  type Resolver,
  type UseFormReturn,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/app/store/hooks';
import {
  updateResume,
  updateExperience,
  deleteExperience,
  updateEducation,
  deleteEducation,
} from '@/entities/Resume';
import { resumeSchema, type ResumeFormValues } from './schema';
import { getEmptyFormValues, toApiPayload } from './transformResume';

interface UseResumeFormResult {
  form: UseFormReturn<ResumeFormValues>;
  experienceArray: ReturnType<
    typeof useFieldArray<ResumeFormValues, 'experience'>
  >;
  educationArray: ReturnType<
    typeof useFieldArray<ResumeFormValues, 'education'>
  >;
  saveMainInfo: () => Promise<void>;
  saveLastExperience: () => Promise<void>;
  removeExperience: (index: number) => Promise<void>;
  saveLastEducation: () => Promise<void>;
  removeEducation: (index: number) => Promise<void>;
  resetFromResume: (resume: ResumeFormValues) => void;
}

export const useResumeForm = (): UseResumeFormResult => {
  const dispatch = useAppDispatch();

  const form = useForm<ResumeFormValues>({
    resolver: yupResolver(resumeSchema) as Resolver<ResumeFormValues>,
    defaultValues: getEmptyFormValues(),
  });

  const experienceArray = useFieldArray({
    control: form.control,
    name: 'experience',
  });

  const educationArray = useFieldArray({
    control: form.control,
    name: 'education',
  });

  const saveMainInfo = useCallback(async () => {
    const values = form.getValues();
    const payload = toApiPayload(values);
    await dispatch(updateResume(payload)).unwrap();
  }, [dispatch, form]);

  const saveLastExperience = useCallback(async () => {
    const experiences = form.getValues('experience');
    const lastIndex = experiences.length - 1;
    if (lastIndex < 0) return;

    const exp = experiences[lastIndex];
    await dispatch(
      updateExperience({
        index: lastIndex,
        data: {
          ...exp,
          startDate: exp.startDate
            ? new Date(exp.startDate).toISOString()
            : '',
          endDate: exp.endDate
            ? new Date(exp.endDate).toISOString()
            : undefined,
        },
      }),
    ).unwrap();
  }, [dispatch, form]);

  const removeExperience = useCallback(
    async (index: number) => {
      await dispatch(deleteExperience(index)).unwrap();
      experienceArray.remove(index);
    },
    [dispatch, experienceArray],
  );

  const saveLastEducation = useCallback(async () => {
    const educations = form.getValues('education');
    const lastIndex = educations.length - 1;
    if (lastIndex < 0) return;

    await dispatch(
      updateEducation({ index: lastIndex, data: educations[lastIndex] }),
    ).unwrap();
  }, [dispatch, form]);

  const removeEducation = useCallback(
    async (index: number) => {
      await dispatch(deleteEducation(index)).unwrap();
      educationArray.remove(index);
    },
    [dispatch, educationArray],
  );

  const resetFromResume = useCallback(
    (values: ResumeFormValues) => form.reset(values),
    [form],
  );

  return {
    form,
    experienceArray,
    educationArray,
    saveMainInfo,
    saveLastExperience,
    removeExperience,
    saveLastEducation,
    removeEducation,
    resetFromResume,
  };
};