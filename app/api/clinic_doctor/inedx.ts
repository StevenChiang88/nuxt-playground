import type { ClinicDoctorResponse } from "./model";
import { useCustomFetch } from "../../composables/useCustomFetch";

const routes = {
  singleClinicDoctor: "/api/clinic-doctor/clinic",
  clinicDoctorStore: "/api/clinic-doctor/store",
  clinicDoctor: "/api/clinic-doctor",
};

export const getSingleClinicDoctor = async (clinicId: string) => {
  const response = await useCustomFetch().get<ClinicDoctorResponse>(
    `${routes.singleClinicDoctor}/${clinicId}`
  );
  return response;
};
