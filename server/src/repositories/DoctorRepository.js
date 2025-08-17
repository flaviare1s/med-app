import Doctor from "../models/Doctor.js";

const getAllDoctors = async () => {
  try {
    return await Doctor.find();
  } catch (error) {
    throw error;
  }
};

const getDoctor = async (id) => {
  try {
    return await Doctor.findById(id);
  } catch (error) {
    throw error;
  }
};

const saveDoctor = async ({
  name,
  login,
  password,
  medicalSpecialty,
  medicalRegistration,
  email,
  phone,
}) => {
  try {
    const doctor = new Doctor({
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    });
    return await doctor.save();
  } catch (error) {
    throw error;
  }
};

const updateDoctor = async (
  id,
  { name, login, password, medicalSpecialty, medicalRegistration, email, phone }
) => {
  try {
    return await Doctor.findByIdAndUpdate(
      id,
      {
        name,
        login,
        password,
        medicalSpecialty,
        medicalRegistration,
        email,
        phone,
      },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

const deleteDoctor = async (id) => {
  try {
    return await Doctor.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

// login
const getDoctorByLogin = async (login) => {
  try {
    return await Doctor.findOne({ login: login });
  } catch (error) {
    throw error;
  }
};

const DoctorRepository = {
  getAllDoctors,
  getDoctor,
  saveDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorByLogin,
};

export default DoctorRepository;
