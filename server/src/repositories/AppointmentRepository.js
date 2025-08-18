import Appointment from "../models/Appointment.js";

const getAllAppointments = async () => {
  return await Appointment.find()
    .populate("doctorId", "name")
    .populate("patientId", "name");
};

const getAppointment = async (id) => {
  try {
    return await Appointment.findById(id)
      .populate("doctorId", "name")
      .populate("patientId", "name");
  } catch (error) {
    throw new Error(error);
  }
};

const saveAppointment = async ({ date, doctorId, patientId }) => {
  try {
    const prescription = new Appointment({ date, doctorId, patientId });
    return await prescription.save();
  } catch (error) {
    throw new Error(error);
  }
};

const updateAppointment = async (id, { date, doctorId, patientId }) => {
  try {
    return await Appointment.findByIdAndUpdate(
      id,
      { date, doctorId, patientId },
      { new: true }
    )
      .populate("doctorId", "name")
      .populate("patientId", "name");
  } catch (error) {
    throw new Error(error);
  }
};

const deleteAppointment = async (id) => {
  try {
    return await Appointment.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

const AppointmentRepository = {
  getAllAppointments,
  getAppointment,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
};

export default AppointmentRepository;
