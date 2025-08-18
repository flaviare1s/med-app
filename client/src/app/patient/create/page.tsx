"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PatientCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name && birthDate && email && phone) {
      const formData = { name, birthDate, email, phone };

      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001"
          }/patients`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: sessionStorage.getItem("token") || "",
            },
            body: JSON.stringify(formData),
          }
        );

        const content = await response.json();

        if (content.name) {
          router.push("/patient/list");
        } else if (content.error) {
          setError(content.error);
        } else {
          setError("Falha ao criar paciente.");
        }
      } catch {
        setError("Erro do servidor. Tente novamente.");
      }
    } else {
      setError("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
        <Link
          href="/home"
          className="text-teal-600 hover:text-teal-800 font-semibold"
        >
          &larr; Voltar ao Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-teal-600 text-center">
          Cadastrar Paciente
        </h1>

        {error && (
          <div className="p-3 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={addPatient} noValidate>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              placeholder="Digite o nome do paciente"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Data de Nascimento
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Digite o email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              placeholder="99 91234-5678"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setPhone(e.target.value)}
            />
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
