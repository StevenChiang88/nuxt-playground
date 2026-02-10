export type DefaultResponse<T> = {
  message: string;
  status: number;
  data: T;
  created_at: string;
  updated_at: string;
};
