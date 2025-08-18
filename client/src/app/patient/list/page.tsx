"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Patient {
  _id: string;
  name: string;
  birthDate: string;
  email: string;
  phone: string;
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch(() => setError("Falha ao carregar pacientes."));
  }, []);

  // Delete patient
  const deletePatient = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/patients/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

      const content = await response.json();
      if (content._id) {
        setPatients(patients.filter((p) => p._id !== id));
      } else if (content.error) {
        setError(content.error);
      }
    } catch {
      setError("Erro do servidor. Não foi possível excluir o paciente.");
    }
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
              <th className="p-3 border border-gray-200 text-left">Nome</th>
              <th className="p-3 border border-gray-200 text-center">
                Data de Nascimento
              </th>
              <th className="p-3 border border-gray-200 text-center">Email</th>
              <th className="p-3 border border-gray-200 text-center">
                Telefone
              </th>
              <th className="p-3 border border-gray-200 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="p-3 border border-gray-200">{patient.name}</td>
                <td className="p-3 border border-gray-200 text-center">
                  {patient.birthDate}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {patient.email}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {patient.phone}
                </td>
                <td className="p-3 border border-gray-200 text-center flex justify-center gap-2">
                  <button
                    onClick={() => deletePatient(patient._id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-1 rounded transition flex items-center gap-1 w-6 h-6 justify-center"
                  >
                    <FaTrash />
                  </button>
                  <Link
                    href={`/patient/edit/${patient._id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded transition flex items-center gap-1 w-6 h-6 justify-center"
                  >
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  Nenhum paciente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
