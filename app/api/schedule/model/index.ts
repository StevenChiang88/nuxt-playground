import type { DefaultResponse } from "~/api/model/index";

export type ScheduleItem = {
  id: number;
  clinic_doctor_id: number;
  date: string;
  start_time: string;
  end_time: string;
  slot_minutes: string;
  created_at: string;
  updated_at: string;
};

export type ScheduleResponse = DefaultResponse<{
  schedules: ScheduleItem[];
}>;

export interface PostScheduleRequest {
  clinic_doctor_id: number;
  date: string;
  start_time: string;
  end_time: string;
  slot_minutes: number;
}

export interface PutScheduleRequest extends PostScheduleRequest {
  id: number;
}
