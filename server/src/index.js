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

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Definir rotas ANTES do listen
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/", router);

const startServer = async () => {
  try {
    console.log("🔄 Iniciando servidor...");
    console.log("📊 Porta configurada:", PORT);
    console.log(
      "🔗 MongoDB URI:",
      process.env.MONGODB_URI ? "✅ Configurado" : "❌ Não configurado"
    );

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log("📋 Admin credentials:");
      console.log("   👤 Login: admin");
      console.log("   🔑 Password: admin");
    });

    console.log("👤 Criando usuário admin...");
    try {
      await createAdminUser();
      console.log("✅ Usuário admin processado");
    } catch (adminError) {
      console.error(
        "⚠️ Erro ao criar admin (não crítico):",
        adminError.message
      );
    }

    return server;
  } catch (error) {
    console.error("❌ Erro na inicialização:", error);
    process.exit(1);
  }
};

startServer().catch((error) => {
  console.error("❌ Erro ao inicializar servidor:", error);
  process.exit(1);
});
