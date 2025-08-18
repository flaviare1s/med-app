# Sistema Médico - Setup Admin

## 🚀 Criação Automática do Usuário Admin

Este projeto cria automaticamente um usuário administrador na primeira execução.

### Credenciais Padrão

- **Login:** `admin`
- **Senha:** `admin`
- **Email:** `admin@medapp.com`
- **CRM:** `ADMIN-000001`

### Como Funciona

#### 1. Automático (Recomendado)

O usuário admin é criado automaticamente quando você inicia o servidor pela primeira vez:

```bash
npm start
```

O sistema verificará se já existe um usuário admin e criará um se necessário.

#### 2. Manual

Se precisar criar o admin manualmente, execute:

```bash
npm run create-admin
```

### Logs do Sistema

Quando o servidor iniciar, você verá:

```
🔍 Verificando se usuário admin já existe...
🚀 Criando usuário admin...
✅ Usuário admin criado com sucesso!
📋 Dados do admin:
   👤 Login: admin
   🔑 Senha: admin
   📧 Email: admin@medapp.com
   🏥 CRM: ADMIN-000001
```

### Primeiro Login

1. Acesse a página de login do sistema
2. Use as credenciais:
   - **Login:** `admin`
   - **Senha:** `admin`
3. ⚠️ **IMPORTANTE:** Altere a senha padrão após o primeiro login!

### Alterando Credenciais Padrão

Para modificar as credenciais padrão, edite o arquivo `src/seeds/createAdmin.js`:

```javascript
const adminUser = new Doctor({
  name: "Seu Nome Aqui",
  login: "seu_login",
  password: hashedPassword, // Hash da nova senha
  crm: "SEU-CRM",
  specialty: "Sua Especialidade",
  phone: "seu_telefone",
  email: "seu_email@exemplo.com",
});
```

### Troubleshooting

**Problema:** Admin não foi criado

- Verifique se o MongoDB está rodando
- Verifique as credenciais de conexão do banco
- Execute manualmente: `npm run create-admin`

**Problema:** Erro de validação

- Verifique se todos os campos obrigatórios estão preenchidos
- Verifique se o CRM está no formato correto
- Verifique se o email é válido

### Segurança

⚠️ **ATENÇÃO:**

- Sempre altere a senha padrão em produção
- Use credenciais fortes
- Considere usar variáveis de ambiente para credenciais sensíveis
