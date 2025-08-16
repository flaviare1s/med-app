import bcrypt from "bcrypt";
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import doctorService from "../services/DoctorService.js";

import AppointmentController from "../controllers/AppointmentController.js";
import DoctorController from "../controllers/DoctorController.js";
import PacientController from "../controllers/PatientController.js";
import PrescriptionController from "../controllers/PrescriptionController.js";

import jwt from "jsonwebtoken";

let router = express.Router();

router.get("/", function (req, res) {
  console.log("hi!");
  res.status(200).json({ message: "hi!" });
});

// Mapeamento do login
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const doctor = await doctorService.getDoctorByLogin(login);
    if (!doctor) {
      return res.status(401).json({ error: "Authentication failed!" });
    }

    const passwordMatch = await bcrypt.compare(password, doctor.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed!" });
    }

    const token = jwt.sign({ doctorId: doctor._id }, "you-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed!" });
  }
});

router.use("/", verifyToken, AppointmentController);
router.use("/", verifyToken, DoctorController);
router.use("/", verifyToken, PacientController);
router.use("/", verifyToken, PrescriptionController);

export default router;
