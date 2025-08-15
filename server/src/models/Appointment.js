import mongoose from "mongoose";
import Doctor from "./Doctor.js";
import Patient from "./Patient.js";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Appointment date is required"],
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: [true, "Doctor ID is required"],
    validate: {
      validator: async function (v) {
        if (!mongoose.Types.ObjectId.isValid(v)) {
          return false;
        }
        return await Doctor.exists({ _id: v });
      },
      message: (props) => `DoctorID ${props.value} not found.`,
    },
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "Patient ID is required"],
    validate: {
      validator: async function (v) {
        if (!mongoose.Types.ObjectId.isValid(v)) {
          return false;
        }
        return await Patient.exists({ _id: v });
      },
      message: (props) => `PacientID ${props.value} not found.`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
