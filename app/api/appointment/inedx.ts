import type {
  AppointmentListResponse,
  AppointmentSingleResponse,
  StoreAppointmentRequest,
  UpdateAppointmentRequest,
} from "./model";
import { useCustomFetch } from "~/composables/useCustomFetch";

const routes = {
  all: "/api/appointment/all",
  store: "/api/appointment/store",
  detail: "/api/appointment",
};

/** 取得我的預約列表 */
export const getAllAppointments = async () => {
  const response = await useCustomFetch().get<AppointmentListResponse>(
    routes.all
  );
  return response;
};

/** 建立預約 */
export const storeAppointment = async (data: StoreAppointmentRequest) => {
  const response = await useCustomFetch().post<AppointmentSingleResponse>(
    routes.store,
    data
  );
  return response;
};

/** 取得單一預約 */
export const getAppointment = async (id: string | number) => {
  const response = await useCustomFetch().get<AppointmentSingleResponse>(
    `${routes.detail}/${id}`
  );
  return response;
};

/** 更新預約（例如取消） */
export const updateAppointment = async (
  id: string | number,
  data: UpdateAppointmentRequest
) => {
  const response = await useCustomFetch().put<AppointmentSingleResponse>(
    `${routes.detail}/${id}`,
    data
  );
  return response;
};

/** 刪除／取消預約 */
export const deleteAppointment = async (id: string | number) => {
  const response = await useCustomFetch().delete<AppointmentSingleResponse>(
    `${routes.detail}/${id}`
  );
  return response;
};
