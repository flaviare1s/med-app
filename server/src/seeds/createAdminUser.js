import bcrypt from "bcrypt";
import Doctor from "../models/Doctor.js";
import db from "../database/database.js";

const createAdminUser = async () => {
  try {
    console.log("🔍 Iniciando processo de criação do admin...");
    console.log("📊 Estado da conexão:", db.readyState);

    // Aguardar a conexão com o banco de dados estar pronta
    await new Promise((resolve, reject) => {
      if (db.readyState === 1) {
        // Já conectado
        console.log("✅ Banco já conectado");
        resolve();
      } else {
        console.log("⏳ Aguardando conexão com banco...");
        // Aguardar conexão
        db.once("open", () => {
          console.log("✅ Conexão estabelecida");
          resolve();
        });
        db.once("error", (error) => {
          console.log("❌ Erro na conexão:", error);
          reject(error);
        });
      }
    });

    console.log("🔍 Verificando se usuário admin já existe...");

    // Verificar se já existe um usuário admin
    const existingAdmin = await Doctor.findOne({ login: "admin" });
    console.log(
      "🔎 Resultado da busca por admin:",
      existingAdmin ? "Encontrado" : "Não encontrado"
    );

    if (existingAdmin) {
      console.log("✅ Usuário admin já existe!");
      console.log("📋 Admin encontrado:", {
        id: existingAdmin._id,
        name: existingAdmin.name,
        login: existingAdmin.login,
        email: existingAdmin.email,
      });
      return;
    }

    console.log("🚀 Criando usuário admin...");

    // Hash da senha
    console.log("🔐 Gerando hash da senha...");
    const hashedPassword = await bcrypt.hash("admin", 10);
    console.log("✅ Hash gerado com sucesso");

    // Criar usuário admin
    console.log("👤 Criando objeto Doctor...");
    const adminUser = new Doctor({
      name: "Dr. João Silva",
      login: "admin",
      password: hashedPassword,
      medicalRegistration: "CRM/SP 123456",
      medicalSpecialty: "Clínico Geral",
      phone: "11 91234-5678",
      email: "joao.silva@hospital.com",
    });

    console.log("💾 Salvando no banco de dados...");
    const savedAdmin = await adminUser.save();
    console.log("✅ Usuário salvo com ID:", savedAdmin._id);

    console.log("✅ Usuário admin criado com sucesso!");
    console.log("📋 Dados do admin:");
    console.log("   👤 Login: admin");
    console.log("   🔑 Senha: admin");
    console.log("   👨‍⚕️ Nome: Dr. João Silva");
    console.log("   📧 Email: joao.silva@hospital.com");
    console.log("   🏥 CRM: CRM/SP 123456");
    console.log("   📞 Telefone: 11 91234-5678");
    console.log("   🩺 Especialidade: Clínico Geral");
    console.log("   🆔 ID no banco:", savedAdmin._id);

    // Verificar se foi salvo corretamente
    console.log("🔍 Verificando se foi salvo corretamente...");
    const verifyAdmin = await Doctor.findOne({ login: "admin" });
    console.log(
      "✅ Verificação:",
      verifyAdmin ? "Admin encontrado no banco!" : "❌ Admin NÃO encontrado!"
    );
  } catch (error) {
    console.error("❌ Erro ao criar usuário admin:", error);

    // Se for erro de validação, mostrar detalhes
    if (error.name === "ValidationError") {
      console.error("📝 Detalhes do erro de validação:");
      Object.values(error.errors).forEach((err) => {
        console.error(`   - ${err.path}: ${err.message}`);
      });
    }

    // Se for erro de duplicação
    if (error.code === 11000) {
      console.error("📝 Erro de duplicação - admin já existe!");
      console.error("🔑 Campo duplicado:", error.keyPattern);
    }
  }
};

export default createAdminUser;
