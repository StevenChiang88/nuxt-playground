export type DefaultResponse<T> = {
  message: string;
  status: string;
  data: T;
  created_at: string;
  updated_at: string;
};
