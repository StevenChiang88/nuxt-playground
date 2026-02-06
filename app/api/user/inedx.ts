import type { UserResponse } from "./model";
import { useCustomFetch } from "~/composables/useCustomFetch";

const routes = {
  me: "/api/user/me",
  all: "/api/user/all",
};

export const getMe = async () => {
  const response = await useCustomFetch().get<UserResponse>(routes.me);
  return response;
};

export const getAllUsers = async () => {
  const response = await useCustomFetch().get<UserResponse>(routes.all);
  return response;
};
