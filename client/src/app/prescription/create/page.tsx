"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Appointment {
  _id: string;
  date: string;
  doctorId: {
    name: string;
  };
  patientId: {
    name: string;
  };
}

export default function PrescriptionCreate() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [medicine, setMedicine] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
    // Set current date as default
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });
      const data = await response.json();
      setAppointments(data);
    } catch {
      setError("Falha ao carregar consultas.");
    } finally {
      setLoading(false);
    }
  };

  const addPrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedAppointment || !date || !medicine || !dosage) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const formData = {
      date: date,
      appointmentId: selectedAppointment,
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
        router.push("/prescription/list");
      } else if (content.error) {
        setError(content.error);
      } else {
        setError("Falha ao criar prescrição.");
      }
    } catch {
      setError("Erro do servidor. Tente novamente.");
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-10 min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50">
      <Link
        href="/prescription/list"
        className="mb-4 inline-block font-medium text-teal-600 hover:text-teal-800 transition"
      >
        &larr; Voltar às Prescrições
      </Link>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-teal-600 text-center mb-6">
          Criar Nova Prescrição
        </h1>

        {error && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={addPrescription} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Consulta *
            </label>
            <select
              value={selectedAppointment}
              onChange={(e) => setSelectedAppointment(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              required
            >
              <option value="">Selecione uma consulta</option>
              {appointments.map((appointment) => (
                <option key={appointment._id} value={appointment._id}>
                  {formatDate(appointment.date)} - Dr.{" "}
                  {appointment.doctorId?.name} - Paciente:{" "}
                  {appointment.patientId?.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Data da Prescrição *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Medicamento *
            </label>
            <textarea
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              placeholder="Ex: Dipirona 500mg"
              rows={3}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dosagem *
            </label>
            <textarea
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Ex: 1 comprimido a cada 6 horas"
              rows={2}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Instruções de Uso
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Ex: Tomar após as refeições, com bastante água"
              rows={3}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Criar Prescrição
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          * Campos obrigatórios
        </p>
      </div>
    </div>
  );
}
