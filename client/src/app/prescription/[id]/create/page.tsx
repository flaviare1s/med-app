"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PrescriptionCreate({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const appointmentId = params.id;

  const [date, setDate] = useState<string>("");
  const [medicine, setMedicine] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addPrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date || !medicine || !dosage) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const formData = {
      date: date,
      appointmentId: appointmentId,
      medicine: medicine,
      dosage: dosage,
      instructions: instructions,
    };

    try {
      const response = await fetch("http://127.0.0.1:3001/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (content.date) {
        router.push("/appointment/list");
      } else if (content.error) {
        setError(content.error);
      } else {
        setError("Falha ao criar prescrição.");
      }
    } catch {
      setError("Erro do servidor. Tente novamente.");
    }
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
        <Link
          href="/appointment/list"
          className="text-teal-600 hover:text-teal-800 font-semibold"
        >
          &larr; Voltar às Consultas
        </Link>

        <h1 className="text-3xl font-bold text-teal-600 text-center">
          Criar Prescrição
        </h1>

        {error && (
          <div className="p-3 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm text-center">
            {error}
          </div>
        )}

        <form
          className="flex flex-col gap-4"
          onSubmit={addPrescription}
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Data da Prescrição *
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Medicamento *
            </label>
            <textarea
              placeholder="Ex: Dipirona 500mg"
              rows={3}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
              onChange={(e) => setMedicine(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Dosagem *
            </label>
            <textarea
              placeholder="Ex: 1 comprimido a cada 6 horas"
              rows={2}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
              onChange={(e) => setDosage(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Instruções de Uso
            </label>
            <textarea
              placeholder="Ex: Tomar após as refeições, com bastante água"
              rows={3}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Criar Prescrição
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center">
          * Campos obrigatórios
        </p>
      </div>
    </div>
  );
}
