import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  registerUser,
  fetchPositions,
  selectPositions,
  selectUserLoading,
} from "@/entities/User";
import { ROUTES } from "@/shared/config/routes";
import type { RegisterFormData } from "./schemas";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const positions = useAppSelector(selectPositions);
  const loading = useAppSelector(selectUserLoading);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const submit = useCallback(
    async (data: RegisterFormData) => {
      await dispatch(registerUser(data)).unwrap();
      navigate(ROUTES.root);
    },
    [dispatch, navigate]
  );

  return { positions, loading, submit };
};
