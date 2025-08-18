#!/usr/bin/env node

/**
 * Script para verificar usuários no banco
 * Execute com: npm run check-users
 */

import Doctor from "./src/models/Doctor.js";
import "./src/database/database.js";
import db from "./src/database/database.js";

const checkUsers = async () => {
  try {
    console.log("🔍 Verificando usuários no banco de dados...");
    console.log("=".repeat(50));

    // Aguardar conexão
    await new Promise((resolve, reject) => {
      if (db.readyState === 1) {
        resolve();
      } else {
        db.once("open", resolve);
        db.once("error", reject);
      }
    });

    // Buscar todos os usuários
    const allUsers = await Doctor.find({});
    console.log(`📊 Total de usuários encontrados: ${allUsers.length}`);

    if (allUsers.length === 0) {
      console.log("❌ Nenhum usuário encontrado no banco!");
    } else {
      console.log("\n👥 Lista de usuários:");
      allUsers.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.name}`);
        console.log(`   👤 Login: ${user.login}`);
        console.log(`   📧 Email: ${user.email}`);
        console.log(`   🏥 CRM: ${user.crm}`);
        console.log(`   🆔 ID: ${user._id}`);
      });
    }

    // Verificar especificamente o admin
    console.log("\n" + "=".repeat(50));
    console.log("🔍 Verificando usuário admin especificamente...");

    const adminUser = await Doctor.findOne({ login: "admin" });

    if (adminUser) {
      console.log("✅ Usuário admin encontrado!");
      console.log("📋 Detalhes do admin:");
      console.log(`   👤 Nome: ${adminUser.name}`);
      console.log(`   👤 Login: ${adminUser.login}`);
      console.log(`   📧 Email: ${adminUser.email}`);
      console.log(`   🏥 CRM: ${adminUser.crm}`);
      console.log(`   🆔 ID: ${adminUser._id}`);
      console.log(
        `   🔐 Senha (hash): ${adminUser.password.substring(0, 20)}...`
      );
    } else {
      console.log("❌ Usuário admin NÃO encontrado!");
    }
  } catch (error) {
    console.error("❌ Erro ao verificar usuários:", error);
  }
};

console.log("🔧 Executando script de verificação de usuários...");
checkUsers()
  .then(() => {
    console.log("\n=".repeat(50));
    console.log("✅ Verificação concluída!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Erro ao executar verificação:", error);
    process.exit(1);
  });
