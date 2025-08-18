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
    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

router.get("/doctors/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await DoctorService.getDoctor(id);

    if (!doctor) {
      return res.status(404).json({
        error: "Médico não encontrado.",
      });
    }

    res.send(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

router.post("/doctors", async (req, res) => {
  const {
    name,
    login,
    password,
    medicalSpecialty,
    medicalRegistration,
    email,
    phone,
  } = req.body;

  // Validações básicas
  if (
    !name ||
    !login ||
    !password ||
    !medicalSpecialty ||
    !medicalRegistration ||
    !email ||
    !phone
  ) {
    return res.status(400).json({
      error:
        "Todos os campos são obrigatórios: nome, login, senha, especialidade médica, registro médico, email e telefone.",
    });
  }

  // Validação do formato do telefone
  const phoneRegex = /^\d{2} 9\d{4}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      error: "Formato de telefone inválido. Use o formato: 99 91234-5678",
    });
  }

  // Validação do formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Formato de email inválido.",
    });
  }

  // Validação do formato do registro médico
  const crmRegex = /^CRM\/[A-Z]{2}\s\d{4,6}$/;
  if (!crmRegex.test(medicalRegistration)) {
    return res.status(400).json({
      error:
        "Formato do registro médico inválido. Use o formato: CRM/SP 123456",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await DoctorService.saveDoctor({
      name,
      login,
      password: hashedPassword,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    });
    res.status(201).json(doctor);
  } catch (error) {
    console.error(error);

    // Verificar se é erro de validação do Mongoose
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({
        error: firstError.message,
      });
    }

    // Verificar se é erro de duplicação
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      let message = "Este valor já está em uso.";

      if (duplicatedField === "login") {
        message = "Este login já está cadastrado para outro médico.";
      } else if (duplicatedField === "email") {
        message = "Este email já está cadastrado para outro médico.";
      } else if (duplicatedField === "medicalRegistration") {
        message = "Este registro médico já está cadastrado para outro médico.";
      }

      return res.status(400).json({ error: message });
    }

    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
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

  // Validações básicas
  if (
    !name ||
    !login ||
    !medicalSpecialty ||
    !medicalRegistration ||
    !email ||
    !phone
  ) {
    return res.status(400).json({
      error:
        "Todos os campos são obrigatórios: nome, login, especialidade médica, registro médico, email e telefone.",
    });
  }

  // Validação do formato do telefone
  const phoneRegex = /^\d{2} 9\d{4}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      error: "Formato de telefone inválido. Use o formato: 99 91234-5678",
    });
  }

  // Validação do formato do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Formato de email inválido.",
    });
  }

  // Validação do formato do registro médico
  const crmRegex = /^CRM\/[A-Z]{2}\s\d{4,6}$/;
  if (!crmRegex.test(medicalRegistration)) {
    return res.status(400).json({
      error:
        "Formato do registro médico inválido. Use o formato: CRM/SP 123456",
    });
  }

  try {
    const updateData = {
      name,
      login,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    };

    // Se uma nova senha foi fornecida, hasheá-la
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const doctor = await DoctorService.updateDoctor(id, updateData);

    if (!doctor) {
      return res.status(404).json({
        error: "Médico não encontrado.",
      });
    }

    res.send(doctor);
  } catch (error) {
    console.error(error);

    // Verificar se é erro de validação do Mongoose
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({
        error: firstError.message,
      });
    }

    // Verificar se é erro de duplicação
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      let message = "Este valor já está em uso.";

      if (duplicatedField === "login") {
        message = "Este login já está cadastrado para outro médico.";
      } else if (duplicatedField === "email") {
        message = "Este email já está cadastrado para outro médico.";
      } else if (duplicatedField === "medicalRegistration") {
        message = "Este registro médico já está cadastrado para outro médico.";
      }

      return res.status(400).json({ error: message });
    }

    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

router.delete("/doctors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await DoctorService.deleteDoctor(id);

    if (!doctor) {
      return res.status(404).json({
        error: "Médico não encontrado.",
      });
    }

    res.send(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

export default router;
