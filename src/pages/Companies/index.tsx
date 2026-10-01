import { useCallback, useEffect, useState } from "react";
import { Button, Input, Select, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchStages,
  fetchStatuses,
  fetchCompanies,
  fetchCompanyById,
  deleteCompany,
  clearCurrentCompany,
  clearError,
  selectCompanies,
  selectStages,
  selectStatuses,
  selectCurrentCompany,
  selectCompanyLoading,
  selectCompanyFormLoading,
  selectCompanyError,
  selectCompanyPagination,
} from "@/entities/Company";

import {
  CompanyFormDrawer,
  CompanyDeleteModal,
  useCompanyFilters,
  useCompanyForm,
  type CompanyFormValues,
} from "@/features/company";

import { CompaniesTable } from "./ui/CompaniesTable";
import styles from "./ui/Companies.module.scss";

const { Title, Text } = Typography;

const CompaniesPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const companies = useAppSelector(selectCompanies);
  const stages = useAppSelector(selectStages);
  const statuses = useAppSelector(selectStatuses);
  const currentCompany = useAppSelector(selectCurrentCompany);
  const loading = useAppSelector(selectCompanyLoading);
  const formLoading = useAppSelector(selectCompanyFormLoading);
  const error = useAppSelector(selectCompanyError);
  const { page, total } = useAppSelector(selectCompanyPagination);

  const {
    filters,
    setFilter,
    debouncedFilters,
    page: currentPage,
    setPage,
    pageSize,
  } = useCompanyFilters();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchStages());
    dispatch(fetchStatuses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchCompanies({
        page: currentPage,
        limit: pageSize,
        ...debouncedFilters,
      })
    );
  }, [dispatch, currentPage, pageSize, debouncedFilters]);

  const closeDrawer = useCallback(() => {
    setDrawerVisible(false);
    setEditingId(null);
    dispatch(clearCurrentCompany());
    dispatch(clearError());
  }, [dispatch]);

  const { form, submit, resetToCompany, reset } = useCompanyForm({
    onSuccess: closeDrawer,
    currentPage,
    pageSize,
    filters: debouncedFilters,
  });

  useEffect(() => {
    if (currentCompany && editingId) {
      resetToCompany(currentCompany);
    }
  }, [currentCompany, editingId, resetToCompany]);

  const handleEdit = useCallback(
    (id: string) => {
      dispatch(clearError());
      setEditingId(id);
      dispatch(fetchCompanyById(id));
      setDrawerVisible(true);
    },
    [dispatch]
  );

  const handleCreate = useCallback(() => {
    dispatch(clearError());
    dispatch(clearCurrentCompany());
    reset();
    setEditingId(null);
    setDrawerVisible(true);
  }, [dispatch, reset]);

  const handleDelete = useCallback(async () => {
    if (!deleteId) return;
    try {
      await dispatch(deleteCompany(deleteId)).unwrap();
      setDeleteId(null);
    } catch (err) {
      console.error("[Companies] delete failed", err);
    }
  }, [dispatch, deleteId]);

  const handleSubmit = useCallback(
    async (values: CompanyFormValues) => {
      try {
        await submit(values, editingId);
      } catch (err) {
        console.error("[Companies] submit failed", err);
      }
    },
    [submit, editingId]
  );

  return (
    <div className={styles.container}>
      <Title level={4}>{t("companies.title")}</Title>

      {error && <Text type="danger">{error}</Text>}

      <div className={styles.filters}>
        <Input
          placeholder={t("companies.searchName")}
          value={filters.companyName ?? ""}
          onChange={(e) => setFilter("companyName", e.target.value)}
          className={styles.filterInput}
        />
        <Input
          placeholder={t("companies.searchVacancy")}
          value={filters.vacancyName ?? ""}
          onChange={(e) => setFilter("vacancyName", e.target.value)}
          className={styles.filterInput}
        />
        <Select
          placeholder={t("companies.fields.stage")}
          value={filters.stage}
          onChange={(v) => setFilter("stage", v)}
          allowClear
          className={styles.filterSelect}
          options={stages.map((s) => ({ value: s.type, label: s.title }))}
        />
        <Select
          placeholder={t("companies.fields.status")}
          value={filters.status}
          onChange={(v) => setFilter("status", v)}
          allowClear
          className={styles.filterSelect}
          options={statuses.map((s) => ({ value: s.type, label: s.title }))}
        />
        <Input
          placeholder={t("companies.searchTelegram")}
          value={filters.telegramNick ?? ""}
          onChange={(e) => setFilter("telegramNick", e.target.value)}
          className={styles.filterInput}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          {t("companies.add")}
        </Button>
      </div>

      <CompaniesTable
        companies={companies}
        stages={stages}
        statuses={statuses}
        loading={loading}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={setDeleteId}
      />

      <CompanyFormDrawer
        open={drawerVisible}
        editing={Boolean(editingId)}
        isSubmitting={formLoading}
        form={form}
        stages={stages}
        statuses={statuses}
        currentCompany={currentCompany}
        placement="right"
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />

      <CompanyDeleteModal
        open={Boolean(deleteId)}
        isLoading={formLoading}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default CompaniesPage;
