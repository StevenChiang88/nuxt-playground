import type { DefaultResponse } from "~/api/model/index";
import type { DoctorItem } from "~/api/doctor/model";

export type ClinicItem = {
  id: string;
  name: string;
  address: string;
  phone: string;
  doctors: DoctorItem[];
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
  doctor_ids: string[];
};

export type updateClinicRequest = {
  id: string;
  name: string;
  address: string;
  phone: string;
  doctor_ids: string[];
};
