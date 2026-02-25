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

export type ScheduleItem = {
  schedule_id: number;
  clinic_doctor_id: number;
  doctor_id: number;
  doctor_name: string;
  start_time: string;
  end_time: string;
  slot_minutes: number;
  slots: string[];
};
export type DailyAvailabilityItem = {
  date: string;
  schedules: ScheduleItem[];
};

export interface MonthlyAvailabilityData {
  days: DailyAvailabilityItem[];
  month_end: string;
  month_start: string;
}
export type MonthlyAvailabilityResponse =
  DefaultResponse<MonthlyAvailabilityData>;
