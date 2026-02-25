import type {
  ScheduleResponse,
  PostScheduleRequest,
  PutScheduleRequest,
} from "./model";
import { useCustomFetch } from "../../composables/useCustomFetch";

const routes = {
  allSchedule: "/api/schedule/all",
  scheduleStore: "/api/schedule/store",
  schedule: "/api/schedule",
};

export const getAllSchedule = async () => {
  const response = await useCustomFetch().get<ScheduleResponse>(
    routes.allSchedule
  );
  return response;
};

export const storeSchedule = async (data: PostScheduleRequest) => {
  const response = await useCustomFetch().post<ScheduleResponse>(
    routes.scheduleStore,
    data
  );
  return response;
};

export const updateSchedule = async (data: PutScheduleRequest) => {
  const response = await useCustomFetch().put<ScheduleResponse>(
    `${routes.schedule}/${data.id}`,
    data
  );
  return response;
};

export const deleteSchedule = async (id: number) => {
  const response = await useCustomFetch().delete<ScheduleResponse>(
    `${routes.schedule}/${id}`
  );
  return response;
};
