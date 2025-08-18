import Patient from "../models/Patient.js";

const getAllPatients = async () => {
  try {
    return await Patient.find();
  } catch (error) {
    throw error;
  }
};

const getPatient = async (id) => {
  try {
    return await Patient.findById(id);
  } catch (error) {
    throw error;
  }
};

const savePatient = async ({ name, birthDate, email, phone }) => {
  try {
    const patient = new Patient({ name, birthDate, email, phone });
    return await patient.save();
  } catch (error) {
    // Re-throw the original error to preserve validation messages
    throw error;
  }
};

const updatePatient = async (id, { name, birthDate, email, phone }) => {
  try {
    return await Patient.findByIdAndUpdate(
      id,
      { name, birthDate, email, phone },
      { new: true, runValidators: true }
    );
  } catch (error) {
    // Re-throw the original error to preserve validation messages
    throw error;
  }
};

const deletePatient = async (id) => {
  try {
    return await Patient.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

const PatientRepository = {
  getAllPatients,
  getPatient,
  savePatient,
  updatePatient,
  deletePatient,
};

export default PatientRepository;
