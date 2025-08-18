import mongoose from "mongoose";
import Doctor from "./Doctor.js";
import Patient from "./Patient.js";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Data da consulta é obrigatória."],
    validate: {
      validator: function (v) {
        return v && v >= new Date();
      },
      message: "Data da consulta deve ser igual ou posterior à data atual.",
    },
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: [true, "ID do médico é obrigatório."],
    validate: {
      validator: async function (v) {
        if (!mongoose.Types.ObjectId.isValid(v)) {
          return false;
        }
        return await Doctor.exists({ _id: v });
      },
      message: "Médico não encontrado. Verifique o ID informado.",
    },
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "ID do paciente é obrigatório."],
    validate: {
      validator: async function (v) {
        if (!mongoose.Types.ObjectId.isValid(v)) {
          return false;
        }
        return await Patient.exists({ _id: v });
      },
      message: "Paciente não encontrado. Verifique o ID informado.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
