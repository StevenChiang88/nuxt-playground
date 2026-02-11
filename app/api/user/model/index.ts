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

export type UserItem = {
  id: string;
  name: string;
  email: string;
};

export type UserResponse = DefaultResponse<{
  user: UserItem;
}>;

export type allUsersResponse = DefaultResponse<{
  users: UserItem[];
}>;
