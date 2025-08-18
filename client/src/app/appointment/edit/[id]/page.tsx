"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

interface Appointment {
  _id: string;
  date: string;
  doctorId: string;
  patientId: string;
}

interface Doctor {
  _id: string;
  name: string;
  medicalSpecialty: string;
}

interface Patient {
  _id: string;
  name: string;
}

export default function AppointmentEdit({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const id = params.id;

  const [date, setDate] = useState<string>("");
  const [doctorId, setDoctorId] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [appointment, setAppointment] = useState<Appointment>({
    _id: "",
    date: "",
    doctorId: "",
    patientId: "",
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch appointment data on mount
  useEffect(() => {
    fetch(`${API_URL}/appointments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Format date for datetime-local input
        const formattedDate = data.date
          ? new Date(data.date).toISOString().slice(0, 16)
          : "";
        setAppointment({ ...data, date: formattedDate });
        setDate(formattedDate);
        setDoctorId(data.doctorId);
        setPatientId(data.patientId);
      })
      .catch(() => setError("Falha ao carregar dados da consulta."));
  }, [id]);

  useEffect(() => {
    fetch(`${API_URL}/doctors`, {
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
    fetch(`${API_URL}/patients`, {
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

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = {
      date: date || appointment.date,
      doctorId: doctorId || appointment.doctorId,
      patientId: patientId || appointment.patientId,
    };

    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (content._id) {
        router.push("/appointment/list");
      } else {
        setError(content.error || "Falha ao atualizar consulta.");
      }
    } catch {
      setError("Erro do servidor. Não foi possível atualizar a consulta.");
    }
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50">
      <Link
        href="/appointment/list"
        className="mb-4 inline-block font-medium text-blue-600 hover:text-blue-800 transition"
      >
        &larr; Voltar à Lista de Consultas
      </Link>

      <form
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
        onSubmit={handleEdit}
      >
        <h2 className="text-2xl font-bold text-yellow-500 mb-4 underline">
          Editar Consulta
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Data e Hora</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Médico</label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

        <div className="mb-4">
          <label className="block font-semibold mb-1">Paciente</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition"
          >
            Salvar
          </button>
          <Link
            href="/appointment/list"
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
          >
            Cancelar
          </Link>
        </div>

        {error && (
          <div className="mt-4 p-2 text-red-700 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
