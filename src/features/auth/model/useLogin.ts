import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import { loginUser } from "@/entities/User";
import { ROUTES } from "@/shared/config/routes";
import type { LoginFormData } from "./schemas";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useCallback(
    async (data: LoginFormData) => {
      await dispatch(loginUser(data)).unwrap();
      navigate(ROUTES.root);
    },
    [dispatch, navigate]
  );
};
