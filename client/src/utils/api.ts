// Utilitário para URLs da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

export const apiUrls = {
  // Patients
  patients: `${API_BASE_URL}/patients`,
  patient: (id: string) => `${API_BASE_URL}/patients/${id}`,

  // Doctors
  doctors: `${API_BASE_URL}/doctors`,
  doctor: (id: string) => `${API_BASE_URL}/doctors/${id}`,

  // Appointments
  appointments: `${API_BASE_URL}/appointments`,
  appointment: (id: string) => `${API_BASE_URL}/appointments/${id}`,

  // Prescriptions
  prescriptions: `${API_BASE_URL}/prescriptions`,
  uploadPrescription: (id: string) =>
    `${API_BASE_URL}/uploadPrescription/${id}`,
  readPrescription: (id: string) => `${API_BASE_URL}/readPrescription/${id}`,
  generatePrescription: (id: string) =>
    `${API_BASE_URL}/generatePrescription/${id}`,

  // Legacy pacients (compatibility)
  pacients: `${API_BASE_URL}/pacients`,
  pacient: (id: string) => `${API_BASE_URL}/pacients/${id}`,
  getPacient: (id: string) => `${API_BASE_URL}/getPacient/${id}`,
};

export default apiUrls;
