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
  doctorId: string | { _id: string; name: string; medicalSpecialty: string };
  patientId: string | { _id: string; name: string };
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
      .then((data) => {
        console.log("Appointments data:", data);
        setAppointments(data);
      })
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
      .then((data) => {
        console.log("Doctors data:", data);
        setDoctors(data);
      })
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
      .then((data) => {
        console.log("Patients data:", data);
        setPatients(data);
      })
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

  const findDoctorName = (
    doctorData: string | { _id: string; name: string; medicalSpecialty: string }
  ): string => {
    console.log("Looking for doctor with data:", doctorData);
    console.log("Available doctors:", doctors);

    // Se já é um objeto com os dados do médico
    if (typeof doctorData === "object" && doctorData.name) {
      return doctorData.name;
    }

    // Se é apenas um ID, procurar na lista de médicos
    const doctorId =
      typeof doctorData === "string" ? doctorData : doctorData._id;
    const doctor = doctors.find((doctor) => doctor._id === doctorId);
    if (doctor) {
      console.log("Doctor found:", doctor);
      return doctor.name;
    }
    console.log("Doctor not found, returning N/A");
    return "N/A";
  };

  const findPatientName = (
    patientData: string | { _id: string; name: string }
  ): string => {
    console.log("Looking for patient with data:", patientData);
    console.log("Available patients:", patients);

    // Se já é um objeto com os dados do paciente
    if (typeof patientData === "object" && patientData.name) {
      return patientData.name;
    }

    // Se é apenas um ID, procurar na lista de pacientes
    const patientId =
      typeof patientData === "string" ? patientData : patientData._id;
    const patient = patients.find((patient) => patient._id === patientId);
    const result = patient ? patient.name : "N/A";
    console.log("Patient found:", patient, "Result:", result);
    return result;
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

      <div className="bg-white shadow-lg rounded-lg">
        {/* Tabela para Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="p-3 border border-gray-200 text-left">
                  Data e Hora
                </th>
                <th className="p-3 border border-gray-200 text-center">
                  Médico
                </th>
                <th className="p-3 border border-gray-200 text-center">
                  Paciente
                </th>
                <th className="p-3 border border-gray-200 text-center">
                  Ações
                </th>
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

        {/* Cards para Mobile */}
        <div className="md:hidden p-4 space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center text-gray-500 font-medium py-8">
              Nenhuma consulta encontrada.
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              >
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Data e Hora
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(appointment.date)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Médico
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {findDoctorName(appointment.doctorId)}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Paciente
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {findPatientName(appointment.patientId)}
                    </span>
                  </div>

                  <div className="border-t pt-3">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-2">
                      Ações
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => deleteAppointment(appointment._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition flex items-center justify-center gap-1 text-xs"
                      >
                        <FaTrash />
                        <span>Excluir</span>
                      </button>
                      <Link
                        href={`/appointment/edit/${appointment._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition flex items-center justify-center gap-1 text-xs"
                      >
                        <FaEdit />
                        <span>Editar</span>
                      </Link>
                      <Link
                        href={`/prescription/${appointment._id}/create`}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition flex items-center justify-center gap-1 text-xs"
                      >
                        <FaPrescriptionBottle />
                        <span>Receitar</span>
                      </Link>
                      <Link
                        href="/prescription/upload"
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition flex items-center justify-center gap-1 text-xs"
                      >
                        <FaUpload />
                        <span>Upload</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
