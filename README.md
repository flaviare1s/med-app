# 🏥 MedApp - Sistema de Gestão Médica

Sistema completo para gestão de consultórios médicos, desenvolvido com tecnologias modernas e interface responsiva.

## 📋 Funcionalidades

- 👨‍⚕️ **Gestão de Médicos**: Cadastro, edição e listagem de profissionais
- 👥 **Gestão de Pacientes**: Controle completo de dados dos pacientes
- 📅 **Agendamento de Consultas**: Sistema de marcação e controle de appointments
- 💊 **Prescrições Médicas**: Criação e gerenciamento de receitas médicas
- 🔐 **Sistema de Login**: Autenticação segura para médicos
- 📱 **Interface Responsiva**: Funciona perfeitamente em desktop e mobile

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 15.4.6** - Framework React para produção
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React Icons** - Ícones para interface

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **bcrypt** - Criptografia de senhas
- **CORS** - Controle de acesso entre origens

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (local ou MongoDB Atlas)
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/flaviare1s/med-app.git
cd med-app
```

### 2. Configuração do Backend

```bash
# Navegue para a pasta do servidor
cd server

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações do MongoDB
```

### 3. Configuração do Frontend

```bash
# Em um novo terminal, navegue para a pasta do cliente
cd client

# Instale as dependências
npm install
```

## ⚙️ Configuração

### Variáveis de Ambiente (Backend)

Crie um arquivo `.env` na pasta `server` com:

```env
MONGODB_URI=
```

### MongoDB

Certifique-se de que o MongoDB está rodando localmente ou configure uma string de conexão para MongoDB Atlas.

## 🎯 Como Usar

### 1. Iniciar o Backend

```bash
cd server
npm start
```

O servidor estará rodando em `http://localhost:3001`

**✨ Usuário Admin Automático**: Na primeira execução, o sistema cria automaticamente um usuário administrador:

- **Login**: `admin`
- **Senha**: `admin`

### 2. Iniciar o Frontend

```bash
cd client
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

### 3. Primeiro Acesso

1. Acesse `http://localhost:3000`
2. Faça login com as credenciais admin:
   - **Login**: `admin`
   - **Senha**: `admin`
3. Comece cadastrando médicos e pacientes
4. Agende consultas e crie prescrições

## 📚 Estrutura do Projeto

```
med-app/
├── client/                 # Frontend Next.js
│   ├── src/
│   │   ├── app/           # App Router do Next.js
│   │   │   ├── doctor/    # Páginas de médicos
│   │   │   ├── patient/   # Páginas de pacientes
│   │   │   ├── appointment/ # Páginas de consultas
│   │   │   └── prescription/ # Páginas de prescrições
│   │   └── components/    # Componentes reutilizáveis
│   └── package.json
├── server/                # Backend Express
│   ├── src/
│   │   ├── controllers/   # Controladores da API
│   │   ├── models/        # Modelos do MongoDB
│   │   ├── routes/        # Rotas da API
│   │   ├── services/      # Lógica de negócio
│   │   ├── repositories/  # Acesso a dados
│   │   └── seeds/         # Scripts de inicialização
│   └── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

### Backend

```bash
npm start          # Inicia o servidor com nodemon
npm run production # Inicia em modo produção
```

### Frontend

```bash
npm run dev        # Inicia em modo desenvolvimento
npm run build      # Gera build de produção
npm run start      # Inicia build de produção
npm run lint       # Verifica código com ESLint
```

## 📱 Funcionalidades por Módulo

### 👨‍⚕️ Médicos

- Cadastro com validação de CRM
- Lista com busca e filtros
- Edição de dados
- Sistema de login

### 👥 Pacientes

- Cadastro completo de dados
- Histórico médico
- Lista paginada
- Busca por nome/CPF

### 📅 Consultas

- Agendamento com médico e paciente
- Controle de status
- Visualização por data
- Cancelamento/reagendamento

### 💊 Prescrições

- Criação vinculada a consultas
- Interface mobile-friendly
- Download em PDF
- Histórico por paciente

## 🛠️ Desenvolvimento

### Adicionando Novas Funcionalidades

1. **Backend**: Crie model → repository → service → controller → route
2. **Frontend**: Crie página no app router → componentes necessários
3. **Integração**: Configure chamadas de API no frontend

### Padrões de Código

- Use TypeScript sempre que possível
- Siga as convenções do ESLint
- Componentes funcionais com hooks
- Nomenclatura em português para domínio médico

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se encontrar problemas:

1. Verifique se MongoDB está rodando
2. Confirme as variáveis de ambiente
3. Verifique os logs do servidor
4. Abra uma issue no GitHub

## 📞 Contato

- **Desenvolvedor**: Flávia Reis
- **GitHub**: [@flaviare1s](https://github.com/flaviare1s)

---

⭐ **Gostou do projeto? Deixe uma estrela!** ⭐
