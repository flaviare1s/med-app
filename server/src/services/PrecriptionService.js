import PrescriptionRepository from "../repositories/PrescriptionRepository.js";
import AppointmentService from "../services/AppointmentService.js";
import PatientService from "../services/PatientService.js";
import DoctorService from "../services/DoctorService.js";
import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";

const getAllPrescriptions = async () => {
  return await PrescriptionRepository.getAllPrescriptions();
};

const getPrescription = async (id) => {
  return await PrescriptionRepository.getPrescription(id);
};

const savePrescription = async ({
  date,
  appointmentId,
  medicine,
  dosage,
  instructions,
}) => {
  return await PrescriptionRepository.savePrescription({
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
  });
};

const updatePrescription = async (
  id,
  { date, appointmentId, medicine, dosage, instructions, file }
) => {
  return await PrescriptionRepository.updatePrescription(id, {
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
    file,
  });
};

const deletePrescription = async (id) => {
  return await PrescriptionRepository.deletePrescription(id);
};

const generatePrescriptionFile = async (prescription) => {
  const appointment = await AppointmentService.getAppointment(
    prescription.appointmentId
  );
  const patient = await PatientService.getPatient(appointment.patientId);
  const doctor = await DoctorService.getDoctor(appointment.doctorId);

  const id = prescription._id;

  const prescriptionsDir = path.resolve("src", "prescriptions");
  if (!fs.existsSync(prescriptionsDir)) {
    fs.mkdirSync(prescriptionsDir, { recursive: true });
  }

  const filePath = path.join(prescriptionsDir, id + ".pdf");
  const document = new PDFDocument({ font: "Courier" });


   const writeStream = fs.createWriteStream(filePath);

  document.pipe(writeStream);
  document.fontSize(16).text("Patient Name: " + patient.name);
  document.fontSize(16).text("Doctor Name: " + doctor.name);
  document.fontSize(12).text("Medicine: " + prescription.medicine);
  document.fontSize(12).text("Dose: " + prescription.dosage);
  document.fontSize(12).text("Instructions: " + prescription.instructions);
  document.end();

  return prescription;
};

const PrescriptionService = {
  getAllPrescriptions,
  getPrescription,
  savePrescription,
  updatePrescription,
  deletePrescription,
  generatePrescriptionFile,
};

export default PrescriptionService;
