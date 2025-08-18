"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Doctor {
  _id: string;
  name: string;
  medicalSpecialty: string;
}

interface Patient {
  _id: string;
  name: string;
}

export default function AppointmentCreate() {
  const router = useRouter();

  const [date, setDate] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/doctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch(() => setError("Falha ao carregar médicos."));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch(() => setError("Falha ao carregar pacientes."));
  }, []);

  const addAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date || !doctorId || !patientId) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const formData = {
      date: date,
      doctorId: doctorId,
      patientId: patientId,
    };

    try {
      const response = await fetch("http://127.0.0.1:3001/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (content.date) {
        router.push("/home");
      } else if (content.error) {
        setError(content.error);
      } else {
        setError("Falha ao criar consulta.");
      }
    } catch {
      setError("Erro do servidor. Tente novamente.");
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
          Agendar Consulta
        </h1>

        {error && (
          <div className="p-3 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm text-center">
            {error}
          </div>
        )}

        <form
          className="flex flex-col gap-4"
          onSubmit={addAppointment}
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Data e Hora da Consulta
            </label>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Médico
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setDoctorId(e.target.value)}
              required
            >
              <option value="">Selecione um médico</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} - {doctor.medicalSpecialty}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Paciente
            </label>
            <select
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setPatientId(e.target.value)}
              required
            >
              <option value="">Selecione um paciente</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Agendar Consulta
          </button>
        </form>
      </div>
    </div>
  );
}
