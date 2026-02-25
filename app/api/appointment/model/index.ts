import type { DefaultResponse } from "~/api/model/index";

export type AppointmentStatus =
  | "pending"
  | "booked"
  | "cancelled"
  | "no_show"
  | "completed";

export type AppointmentItem = {
  id: number;
  clinic_doctor_id: number;
  doctor_name: string;
  patient_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
};

export type AppointmentListResponse = DefaultResponse<{
  appointments: AppointmentItem[];
}>;

export type AppointmentSingleResponse = DefaultResponse<{
  appointment: AppointmentItem;
}>;

export type StoreAppointmentRequest = {
  clinic_doctor_id: number;
  date: string;
  start_time: string;
};

export type UpdateAppointmentRequest = {
  status: AppointmentStatus;
};
