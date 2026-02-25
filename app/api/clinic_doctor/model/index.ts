import type { DefaultResponse } from "~/api/model/index";

export type ClinicDoctorItem = {
  id: number;
  clinic_id: number;
  doctor_id: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  user_id: number;
  name: string;
  bio: string;
  specialization: string;
};
export type ClinicDoctorResponse = DefaultResponse<{
  clinic_doctors: ClinicDoctorItem[];
}>;

export type storeDoctorRequest = {
  name: string;
  user_id: string;
  specialization: string;
  bio: string;
};

export type updateDoctorRequest = {
  id: string;
  user_id: string;
  name: string;
  specialization: string;
  bio: string;
};
