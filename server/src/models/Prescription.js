import mongoose from "mongoose";

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (v) {
        return v && v <= new Date();
      },
      message: "Data da prescrição não pode ser futura.",
    },
  },
  appointmentId: {
    type: String,
    required: [true, "ID da consulta é obrigatório."],
    trim: true,
  },
  medicine: {
    type: String,
    required: [true, "Medicamento é obrigatório."],
    trim: true,
    minlength: [2, "Nome do medicamento deve ter pelo menos 2 caracteres."],
    maxlength: [
      200,
      "Nome do medicamento não pode ter mais de 200 caracteres.",
    ],
  },
  dosage: {
    type: String,
    required: [true, "Dosagem é obrigatória."],
    trim: true,
    minlength: [1, "Dosagem deve ser especificada."],
    maxlength: [100, "Dosagem não pode ter mais de 100 caracteres."],
  },
  instructions: {
    type: String,
    trim: true,
    maxlength: [500, "Instruções não podem ter mais de 500 caracteres."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  file: {
    type: String,
    trim: true,
  },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
