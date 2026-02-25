import type {
  ClinicResponse,
  storeClinicRequest,
  updateClinicRequest,
  MonthlyAvailabilityResponse,
} from "./model";
import { useCustomFetch } from "../../composables/useCustomFetch";

const routes = {
  allClinic: "/api/clinic/all",
  clinicStore: "/api/clinic/store",
  clinic: "/api/clinic",
  monthlyAvailability: "/api/clinics/{clinic_id}/monthly-availability",
};

export const getAllClinic = async () => {
  const response = await useCustomFetch().get<ClinicResponse>(routes.allClinic);
  return response;
};

export const storeClinic = async (data: storeClinicRequest) => {
  const response = await useCustomFetch().post<ClinicResponse>(
    routes.clinicStore,
    data
  );
  return response;
};

export const updateClinic = async (data: updateClinicRequest) => {
  const response = await useCustomFetch().put<ClinicResponse>(
    `${routes.clinic}/${data.id}`,
    data
  );
  return response;
};

export const deleteClinic = async (id: string) => {
  const response = await useCustomFetch().delete<ClinicResponse>(
    `${routes.clinic}/${id}`
  );
  return response;
};

export const getMonthlyAvailability = async (params: {
  clinicId: string;
  year: number;
  month: number;
}) => {
  const response = await useCustomFetch().get<MonthlyAvailabilityResponse>(
    `${routes.monthlyAvailability.replace(
      "{clinic_id}",
      params.clinicId
    )}?year=${params.year}&month=${params.month}`
  );
  return response;
};
