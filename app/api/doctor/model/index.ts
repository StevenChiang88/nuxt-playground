import type { DefaultResponse } from "~/api/model/index";

export type DoctorItem = {
  id: string;
  user_id: string;
  name: string;
  specialization: string;
  bio: string;
  created_at: string;
  updated_at: string;
};
export type DoctorResponse = DefaultResponse<{
  doctors: DoctorItem[];
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
