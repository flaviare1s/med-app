import express from "express";
import pkg from "body-parser";
import router from "./routes/router.js";
import "./database/database.js";
import cors from "cors";
import createAdminUser from "./seeds/createAdminUser.js";

const app = express();
const { json, urlencoded } = pkg;
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Função para inicializar o servidor
const startServer = async () => {
  // Criar usuário admin na inicialização (se não existir)
  await createAdminUser();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
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
