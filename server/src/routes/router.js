import express from "express";
import appointmentController from "../controllers/AppointmentController.js";
import doctorController from "../controllers/DoctorController.js";
import patientController from "../controllers/PatientController.js";
import prescriptionController from "../controllers/PrescriptionController.js";

let router = express.Router();

router.get("/", (req, res) => {
  console.log("MEDAPP");
  res.status(200).json({ message: "MEDAPP" });
});

router.use("/", appointmentController);
router.use("/", doctorController);
router.use("/", patientController);
router.use("/", prescriptionController);

export default router;
