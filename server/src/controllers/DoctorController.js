import express from "express";
import bcrypt from "bcrypt";
import DoctorService from "../services/DoctorService.js";

let router = express.Router();

router.get("/doctors", async (_req, res) => {
  try {
    const doctors = await DoctorService.getAllDoctors();
    res.send(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/doctors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await DoctorService.getDoctor(id);
    res.send(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/doctors", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const doctor = await DoctorService.saveDoctor({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json(doctor);
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    if (error.code === 11000) {
      const errors = {};
      for (const key in error.keyValue) {
        errors[key] = `${key} already exists.`;
      }
      return res.status(400).json({ errors });
    }

    res.status(500).json({ error: "Failed to create doctor." });
  }
});


router.put("/doctors/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    login,
    password,
    medicalSpecialty,
    medicalRegistration,
    email,
    phone,
  } = req.body;

  try {
    const doctor = await DoctorService.updateDoctor(id, {
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    });
    res.send(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete("/doctors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await DoctorService.deleteDoctor(id);
    res.send(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
