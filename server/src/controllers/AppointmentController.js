import express from "express";
import AppointmentService from "../services/AppointmentService.js";

let router = express.Router();

router.get("/appointments", async (_req, res) => {
  try {
    const appointments = await AppointmentService.getAllAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await AppointmentService.getAppointment(id);
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/appointments", async (req, res) => {
  const { date, doctorId, patientId } = req.body;
  try {
    const appointment = await AppointmentService.saveAppointment({
      date,
      doctorId,
      patientId,
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { date, doctorId, patientId } = req.body;
  try {
    const appointment = await AppointmentService.updateAppointment(id, {
      date,
      doctorId,
      patientId,
    });
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await AppointmentService.deleteAppointment(id);
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.patch("/reschedule/:id", async (req, res) => {
  const {id} = req.params;
  const {date} = req.body;
  try {
    let appointment = await AppointmentService.getAppointment(id);
    appointment.date = date;
    appointment = await AppointmentService.updateAppointment(id, appointment);
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})

export default router;
