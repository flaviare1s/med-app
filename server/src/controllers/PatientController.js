import express from "express";
import PatientService from "../services/PatientService.js";

let router = express.Router();

router.get("/patients", async (_req, res) => {
  try {
    const patients = await PatientService.getAllPatients();
    res.send(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

router.get("/patients/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await PatientService.getPatient(id);

    if (!patient) {
      return res.status(404).json({
        error: "Paciente não encontrado.",
      });
    }

    res.send(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

router.post("/patients", async function (req, res) {
  const { name, birthDate, email, phone } = req.body;

  // Validações básicas
  if (!name || !birthDate || !email || !phone) {
    return res.status(400).json({
      error:
        "Todos os campos são obrigatórios: nome, data de nascimento, email e telefone.",
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

  try {
    const patient = await PatientService.savePatient({
      name,
      birthDate,
      email,
      phone,
    });
    res.send(patient);
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
      return res.status(400).json({
        error: "Este email já está cadastrado para outro paciente.",
      });
    }

    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

router.put("/patients/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthDate, email, phone } = req.body;

  // Validações básicas
  if (!name || !birthDate || !email || !phone) {
    return res.status(400).json({
      error:
        "Todos os campos são obrigatórios: nome, data de nascimento, email e telefone.",
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

  try {
    const patient = await PatientService.updatePatient(id, {
      name,
      birthDate,
      email,
      phone,
    });

    if (!patient) {
      return res.status(404).json({
        error: "Paciente não encontrado.",
      });
    }

    res.send(patient);
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
      return res.status(400).json({
        error: "Este email já está cadastrado para outro paciente.",
      });
    }

    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

router.delete("/patients/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await PatientService.deletePatient(id);

    if (!patient) {
      return res.status(404).json({
        error: "Paciente não encontrado.",
      });
    }

    res.send(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro interno do servidor. Tente novamente.",
    });
  }
});

export default router;
