"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaTrash,
  FaEdit,
  FaPrescriptionBottle,
  FaUpload,
} from "react-icons/fa";

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

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/appointments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch(() => setError("Falha ao carregar consultas."));
  }, []);

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

  const deleteAppointment = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

      const content = await response.json();
      if (content._id) {
        setAppointments(appointments.filter((a) => a._id !== id));
      } else if (content.error) {
        setError(content.error);
      }
    } catch {
      setError("Erro do servidor. Não foi possível excluir a consulta.");
    }
  };

  const findDoctorName = (id: string): string => {
    const doctor = doctors.find((doctor) => doctor._id === id);
    return doctor ? `${doctor.name} - ${doctor.medicalSpecialty}` : "N/A";
  };

  const findPatientName = (id: string): string => {
    const patient = patients.find((patient) => patient._id === id);
    return patient ? patient.name : "N/A";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR");
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50">
      <Link
        href="/home"
        className="mb-4 inline-block font-medium text-teal-600 hover:text-teal-800 transition"
      >
        &larr; Voltar ao Dashboard
      </Link>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-3 border border-gray-200 text-left">
                Data e Hora
              </th>
              <th className="p-3 border border-gray-200 text-center">Médico</th>
              <th className="p-3 border border-gray-200 text-center">
                Paciente
              </th>
              <th className="p-3 border border-gray-200 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="p-3 border border-gray-200">
                  {formatDate(appointment.date)}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {findDoctorName(appointment.doctorId)}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {findPatientName(appointment.patientId)}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  <div className="flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => deleteAppointment(appointment._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition flex items-center gap-1 text-xs"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      href={`/appointment/edit/${appointment._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition flex items-center gap-1 text-xs"
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      href={`/prescription/${appointment._id}/create`}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition flex items-center gap-1 text-xs"
                    >
                      <FaPrescriptionBottle />
                    </Link>
                    <Link
                      href="/prescription/upload"
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition flex items-center gap-1 text-xs"
                    >
                      <FaUpload />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  Nenhuma consulta encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
