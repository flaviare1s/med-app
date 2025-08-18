"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaCheck } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

interface Appointment {
  _id: string;
  date: string;
  doctorId:
    | {
        name: string;
      }
    | string;
  patientId:
    | {
        name: string;
      }
    | string;
}

export default function PrescriptionCreate() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      console.log("Fetching appointments from frontend...");
      const token = sessionStorage.getItem("token");
      console.log("Token available:", token ? "Yes" : "No");

      const response = await fetch(`${API_URL}/appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        throw new Error(
          `HTTP ${response.status}: ${
            errorData.error || errorData.message || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      console.log("Received data:", data);
      console.log(
        "Data length:",
        Array.isArray(data) ? data.length : "Not an array"
      );

      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error in fetchAppointments:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setError(`Falha ao carregar consultas: ${errorMessage}`);
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
      const response = await fetch(`${API_URL}/prescriptions`, {
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

  const getDoctorName = (doctorId: { name: string } | string): string => {
    // Se é um objeto com name
    if (
      doctorId &&
      typeof doctorId === "object" &&
      "name" in doctorId &&
      doctorId.name
    ) {
      return doctorId.name;
    }

    // Se é apenas uma string (ID) - fallback temporário
    if (typeof doctorId === "string") {
      return `[Médico ID: ${doctorId.slice(-4)}]`;
    }

    return "Médico não informado";
  };

  const getPatientName = (patientId: { name: string } | string): string => {
    // Se é um objeto com name
    if (
      patientId &&
      typeof patientId === "object" &&
      "name" in patientId &&
      patientId.name
    ) {
      return patientId.name;
    }

    // Se é apenas uma string (ID) - fallback temporário
    if (typeof patientId === "string") {
      return `[Paciente ID: ${patientId.slice(-4)}]`;
    }

    return "Paciente não informado";
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

            {/* Dropdown Customizado */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-left bg-white flex items-center justify-between"
              >
                <span className="text-gray-700">
                  {selectedAppointment ? (
                    appointments
                      .filter((apt) => apt._id === selectedAppointment)
                      .map((appointment) => (
                        <span key={appointment._id} className="text-sm">
                          📅 {formatDate(appointment.date)} -{" "}
                          {getDoctorName(appointment.doctorId)}
                        </span>
                      ))
                  ) : (
                    <span className="text-gray-500">
                      Selecione uma consulta
                    </span>
                  )}
                </span>
                <FaChevronDown
                  className={`text-gray-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Lista de Opções */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <button
                        key={appointment._id}
                        type="button"
                        onClick={() => {
                          setSelectedAppointment(appointment._id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full p-3 text-left hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                          selectedAppointment === appointment._id
                            ? "bg-teal-50 text-teal-800"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              📅 {formatDate(appointment.date)}
                            </span>
                            {selectedAppointment === appointment._id && (
                              <FaCheck className="text-teal-600 text-xs" />
                            )}
                          </div>
                          <div className="text-xs text-gray-600">
                            👨‍⚕️ {getDoctorName(appointment.doctorId)}
                          </div>
                          <div className="text-xs text-gray-600">
                            👤 {getPatientName(appointment.patientId)}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p className="text-sm">Nenhuma consulta disponível.</p>
                      <Link
                        href="/appointment/create"
                        className="mt-2 inline-block text-teal-600 hover:text-teal-800 font-medium text-xs"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Criar nova consulta
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fechar dropdown ao clicar fora */}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 z-5"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}
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
