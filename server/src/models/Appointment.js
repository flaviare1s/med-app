import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'Appointment date is required'],
  },
  doctorId: {
    type: String,
    required: [true, 'Doctor ID is required'],
  },
  patientId: {
    type: String,
    required: [true, 'Patient ID is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Appointment = mongoose.model("appointment", appointmentSchema);

export default Appointment;
