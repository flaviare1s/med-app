#!/usr/bin/env node

/**
 * Script para criar usuário admin manualmente
 * Execute com: npm run create-admin
 */

import createAdminUser from "./src/seeds/createAdmin.js";
import "./src/database/database.js"; // Importar conexão com banco

console.log("🔧 Executando script de criação do usuário admin...");
console.log("=".repeat(50));

createAdminUser()
  .then(() => {
    console.log("=".repeat(50));
    console.log("✅ Script executado com sucesso!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Erro ao executar script:", error);
    process.exit(1);
  });
