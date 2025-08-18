import express from "express";
import pkg from "body-parser";
import router from "./routes/router.js";
import "./database/database.js";
import cors from "cors";
import createAdminUser from "./seeds/createAdminUser.js";

const app = express();
const { json, urlencoded } = pkg;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Função para inicializar o servidor
const startServer = async () => {
  // Criar usuário admin na inicialização (se não existir)
  await createAdminUser();

  app.listen(3001, () => {
    console.log("🚀 Server is running on port 3001");
    console.log("📋 Admin credentials:");
    console.log("   👤 Login: admin");
    console.log("   🔑 Password: admin");
  });
};

// Inicializar servidor
startServer().catch((error) => {
  console.error("❌ Erro ao inicializar servidor:", error);
  process.exit(1);
});

app.use("/", router);
