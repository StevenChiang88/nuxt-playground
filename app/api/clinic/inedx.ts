import type {
  ClinicResponse,
  storeClinicRequest,
  updateClinicRequest,
} from "./model";
import { useCustomFetch } from "../../composables/useCustomFetch";

const routes = {
  allClinic: "/api/clinic/all",
  clinicStore: "/api/clinic/store",
  clinic: "/api/clinic",
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
