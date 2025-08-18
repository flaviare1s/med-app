"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

export default function DoctorCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [medicalSpecialty, setMedicalSpecialty] = useState<string>("");
  const [medicalRegistration, setMedicalRegistration] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Aqui guardamos erros de cada campo individualmente
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const addDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const formData = {
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    };

    try {
      const response = await fetch(`${API_URL}/doctors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (content.login) {
        router.push("/doctor/list");
      } else if (content.errors) {
        setFieldErrors(content.errors);
      } else if (content.error) {
        setGeneralError(content.error);
      } else {
        setGeneralError("Falha ao criar médico.");
      }
    } catch (error) {
      console.error("Erro ao criar médico:", error);
      setGeneralError("Erro no servidor. Tente novamente.");
    }
  };

  const renderFieldError = (field: string) =>
    fieldErrors[field] ? (
      <span className="text-red-600 text-sm mt-1">{fieldErrors[field]}</span>
    ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
        <Link
          href="/home"
          className="text-teal-600 hover:text-teal-800 font-semibold"
        >
          &larr; Voltar ao Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-teal-600 text-center">
          Cadastrar Médico
        </h1>

        {generalError && (
          <div className="text-center text-red-700 bg-red-50 border border-red-200 p-3 rounded-md font-medium shadow-sm">
            {generalError}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={addDoctor} noValidate>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              placeholder="Digite o nome do médico"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setName(e.target.value)}
            />
            {renderFieldError("name")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Nome de Usuário
            </label>
            <input
              type="text"
              placeholder="Digite o nome de usuário"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setLogin(e.target.value)}
            />
            {renderFieldError("login")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="Digite a senha"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
            {renderFieldError("password")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Especialidade Médica
            </label>
            <input
              type="text"
              placeholder="Digite a especialidade"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setMedicalSpecialty(e.target.value)}
            />
            {renderFieldError("medicalSpecialty")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Registro Médico
            </label>
            <input
              type="text"
              placeholder="Digite o número do registro"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setMedicalRegistration(e.target.value)}
            />
            {renderFieldError("medicalRegistration")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Digite o email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
            {renderFieldError("email")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              placeholder="99 91234-4567"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setPhone(e.target.value)}
            />
            {renderFieldError("phone")}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
