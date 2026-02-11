import type {
  DoctorResponse,
  storeDoctorRequest,
  updateDoctorRequest,
} from "./model";
import { useCustomFetch } from "../../composables/useCustomFetch";

const routes = {
  allDoctors: "/api/doctor/all",
  doctorStore: "/api/doctor/store",
  doctor: "/api/doctor",
};

export const getAllDoctors = async () => {
  const response = await useCustomFetch().get<DoctorResponse>(
    routes.allDoctors
  );
  return response;
};

export const storeDoctor = async (data: storeDoctorRequest) => {
  const response = await useCustomFetch().post<DoctorResponse>(
    routes.doctorStore,
    data
  );
  return response;
};

export const updateDoctor = async (data: updateDoctorRequest) => {
  const response = await useCustomFetch().put<DoctorResponse>(
    `${routes.doctor}/${data.id}`,
    data
  );
  return response;
};

export const deleteDoctor = async (id: string) => {
  const response = await useCustomFetch().delete<DoctorResponse>(
    `${routes.doctor}/${id}`
  );
  return response;
};
