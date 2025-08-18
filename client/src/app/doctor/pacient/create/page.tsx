"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

export default function PatientCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validação
    if (!name || !birthDate || !email || !phone) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    const formData = {
      name: name.trim(),
      birthDate: birthDate,
      email: email.trim(),
      phone: phone.trim(),
    };

    try {
      const response = await fetch(`${API_URL}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();
      console.log("Response status:", response.status);
      console.log("Response content:", content);

      if (response.ok) {
        console.log("Success! Redirecting to patient list...");
        router.push("/doctor/pacient/list");
      } else {
        setError(content.error || "Erro ao criar paciente.");
      }
    } catch {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
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
          Criar Paciente
        </h1>

        {error && (
          <div className="p-3 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm text-center">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={addPatient} noValidate>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              placeholder="Digite o nome completo"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Data de Nascimento
            </label>
            <input
              type="date"
              name="birthDate"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBirthDate(e.target.value)
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite o email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Digite o telefone"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Criando..." : "Criar Paciente"}
          </button>
        </form>
      </div>
    </div>
  );
}
