import { useCallback } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/app/store/hooks';
import {
  createCompany,
  updateCompany,
  fetchCompanies,
  type Company,
  type CreateCompanyPayload,
} from '@/entities/Company';
import { dayjs } from '@/shared/lib/date/dayjs';
import { companySchema, type CompanyFormValues } from './schema';
import type { CompanyFilters } from './useCompanyFilters';

interface UseCompanyFormOptions {
  onSuccess: () => void;
  currentPage: number;
  pageSize: number;
  filters: CompanyFilters;
}

interface UseCompanyFormResult {
  form: ReturnType<typeof useForm<CompanyFormValues>>;
  submit: (
    values: CompanyFormValues,
    editingId: string | null,
  ) => Promise<void>;
  resetToCompany: (company: Company | null) => void;
  reset: () => void;
}

const DEFAULT_VALUES: CompanyFormValues = {
  companyName: '',
  telegramNick: '',
  stage: 1,
  stageDate: '',
  website: '',
  contactPerson: '',
  companyInfo: '',
  vacancyName: '',
  vacancyLink: '',
  status: 1,
};

export const useCompanyForm = ({
  onSuccess,
  currentPage,
  pageSize,
  filters,
}: UseCompanyFormOptions): UseCompanyFormResult => {
  const dispatch = useAppDispatch();

  const form = useForm<CompanyFormValues>({
    resolver: yupResolver(companySchema) as Resolver<CompanyFormValues>,
    defaultValues: DEFAULT_VALUES,
  });

  const submit = useCallback(
    async (values: CompanyFormValues, editingId: string | null) => {
      const payload: CreateCompanyPayload = {
        companyName: values.companyName || '',
        telegramNick: values.telegramNick || undefined,
        stage: Number(values.stage),
        stageDate: values.stageDate || dayjs().format('YYYY-MM-DD HH:mm:ss'),
        website: values.website || undefined,
        contactPerson: values.contactPerson || undefined,
        companyInfo: values.companyInfo || undefined,
        vacancyName: values.vacancyName || undefined,
        vacancyLink: values.vacancyLink || undefined,
        status: Number(values.status),
      };

      if (editingId) {
        await dispatch(
          updateCompany({ id: editingId, data: payload }),
        ).unwrap();
      } else {
        await dispatch(createCompany(payload)).unwrap();
      }

      void dispatch(
        fetchCompanies({ page: currentPage, limit: pageSize, ...filters }),
      );
      onSuccess();
    },
    [dispatch, currentPage, pageSize, filters, onSuccess],
  );

  const resetToCompany = useCallback(
    (company: Company | null) => {
      if (!company) {
        form.reset(DEFAULT_VALUES);
        return;
      }
      form.reset({
        companyName: company.companyName ?? '',
        telegramNick: company.telegramNick ?? '',
        stage: company.stage,
        stageDate: company.stageDate ?? '',
        website: company.website ?? '',
        contactPerson: company.contactPerson ?? '',
        companyInfo: company.companyInfo ?? '',
        vacancyName: company.vacancyName ?? '',
        vacancyLink: company.vacancyLink ?? '',
        status: company.status,
      });
    },
    [form],
  );

  const reset = useCallback(() => form.reset(DEFAULT_VALUES), [form]);

  return { form, submit, resetToCompany, reset };
};