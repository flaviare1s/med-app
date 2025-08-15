import AppointmentRepository from "../repositories/AppointmentRepository.js";

const getAllAppointments = async () => {
  return await AppointmentRepository.getAllAppointments();
};

const getAppointment = async (id) => {
  return await AppointmentRepository.getAppointment(id);
};

const saveAppointment = async ({date, doctorId, patientId}) => {
  return await AppointmentRepository.saveAppointment({date, doctorId, patientId})
};

const updateAppointment = async (id, {date, doctorId, patientId}) => {
  return await AppointmentRepository.updateAppointment(id, {date, doctorId, patientId})
};

const deleteAppointment = async (id) => {
  return await AppointmentRepository.deleteAppointment(id)
};

const AppointmentService = {
  getAllAppointments,
  getAppointment,
  saveAppointment,
  updateAppointment,
  deleteAppointment
};

export default AppointmentService;
