import type { DefaultResponse } from "~/api/model/index";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = DefaultResponse<{
  token: string;
}>;

export type RegisterResponse = DefaultResponse<{
  token: string;
}>;

export type UserResponse = DefaultResponse<{
  id: string;
  name: string;
  email: string;
}>;
