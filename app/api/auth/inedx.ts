import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  UserResponse,
} from "./model";
import { useCustomFetch } from "../../composables/useCustomFetch";

const routes = {
  csrf: "/sanctum/csrf-cookie",
  login: "/api/auth/login",
  register: "/api/auth/register",
  user: "/api/auth/user",
};

export const getCsrfCookie = async () => {
  const response = await useCustomFetch().get(routes.csrf);
  return response;
};

export const login = async (data: LoginRequest) => {
  const response = await useCustomFetch().post<LoginResponse>(
    routes.login,
    data
  );
  return response;
};

export const register = async (data: RegisterRequest) => {
  const response = await useCustomFetch().post<RegisterResponse>(
    routes.register,
    data
  );
  return response;
};

export const getUser = async () => {
  const response = await useCustomFetch().get<UserResponse>(routes.user);
  return response;
};
