import mongoose from "mongoose";

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome do paciente é obrigatório."],
    trim: true,
    minlength: [2, "Nome deve ter pelo menos 2 caracteres."],
    maxlength: [100, "Nome não pode ter mais de 100 caracteres."],
  },
  birthDate: {
    type: Date,
    required: [true, "Data de nascimento é obrigatória."],
    validate: {
      validator: function (v) {
        return v && v < new Date();
      },
      message: "Data de nascimento deve ser uma data válida no passado.",
    },
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório."],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Formato de email inválido.",
    },
  },
  phone: {
    type: String,
    required: [true, "Telefone é obrigatório."],
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{2} 9\d{4}-\d{4}$/.test(v);
      },
      message: "Formato de telefone inválido. Use o formato: 99 91234-5678",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
