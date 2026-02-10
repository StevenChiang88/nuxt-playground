import type { DefaultResponse } from "~/api/model/index";

export type ClinicItem = {
  id: string;
  name: string;
  address: string;
  phone: string;
  created_at: string;
  updated_at: string;
};
export type ClinicResponse = DefaultResponse<{
  clinics: ClinicItem[];
}>;

export type storeClinicRequest = {
  name: string;
  address: string;
  phone: string;
};

export type updateClinicRequest = {
  id: string;
  name: string;
  address: string;
  phone: string;
};