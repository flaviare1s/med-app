import mongoose from "mongoose";

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome do médico é obrigatório."],
    trim: true,
    minlength: [2, "Nome deve ter pelo menos 2 caracteres."],
    maxlength: [100, "Nome não pode ter mais de 100 caracteres."],
  },
  login: {
    type: String,
    required: [true, "Nome de usuário é obrigatório."],
    unique: true,
    trim: true,
    minlength: [3, "Nome de usuário deve ter pelo menos 3 caracteres."],
    maxlength: [50, "Nome de usuário não pode ter mais de 50 caracteres."],
  },
  password: {
    type: String,
    required: [true, "Senha é obrigatória."],
    minlength: [6, "Senha deve ter pelo menos 6 caracteres."],
  },
  medicalSpecialty: {
    type: String,
    required: [true, "Especialidade médica é obrigatória."],
    trim: true,
    minlength: [2, "Especialidade deve ter pelo menos 2 caracteres."],
    maxlength: [100, "Especialidade não pode ter mais de 100 caracteres."],
  },
  medicalRegistration: {
    type: String,
    required: [true, "Registro médico é obrigatório."],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^CRM\/[A-Z]{2}\s\d{4,6}$/.test(v);
      },
      message:
        "Formato do registro médico inválido. Use o formato: CRM/SP 123456",
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

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
