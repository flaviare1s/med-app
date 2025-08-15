import PatientRepository from "../repositories/PatientRepository.js";


const getAllPatients = async () => {
  return await PatientRepository.getAllPatients();
};

const getPatient = async (id) => {
  return await PatientRepository.getPatient(id);
};

const savePatient = async ({ name, birthDate, email, phone }) => {
  return await PatientRepository.savePatient({ name, birthDate, email, phone });
};

const updatePatient = async (id, { name, birthDate, email, phone }) => {
  return await PatientRepository.updatePatient(id, {
    name,
    birthDate,
    email,
    phone,
  });
};

const deletePatient = async (id) => {
  return await PatientRepository.deletePatient(id);
};

const PatientService = {
  getAllPatients,
  getPatient,
  savePatient,
  updatePatient,
  deletePatient,
};

export default PatientService;
