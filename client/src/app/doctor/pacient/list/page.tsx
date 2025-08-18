"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

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
  }, []); // Removido dependência que causava loop infinito

  const deletePatient = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

      if (response.ok) {
        // Remove o paciente da lista local
        setPatients(patients.filter((patient) => patient._id !== id));
        setError(null);
      } else {
        const content = await response.json();
        setError(content.error || "Erro ao deletar paciente.");
      }
    } catch {
      setError("Erro de conexão ao deletar paciente.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Link
        className="font-medium text-blue-600 hover:underline mb-4 inline-block"
        href="/home"
      >
        ← Voltar ao Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Lista de Pacientes
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-slate-300 px-4 py-2 text-left">
                Nome
              </th>
              <th className="border border-slate-300 px-4 py-2 text-center">
                Nascimento
              </th>
              <th className="border border-slate-300 px-4 py-2 text-center">
                Email
              </th>
              <th className="border border-slate-300 px-4 py-2 text-center">
                Telefone
              </th>
              <th className="border border-slate-300 px-4 py-2 text-center">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.length > 0 ? (
              patients.map((patient: Patient) => (
                <tr key={patient._id}>
                  <td className="border border-slate-300 px-4 py-2">
                    {patient.name}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-center">
                    {new Date(patient.birthDate).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-center">
                    {patient.email}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-center">
                    {patient.phone}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => deletePatient(patient._id)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white text-sm rounded transition"
                      >
                        Deletar
                      </button>
                      <Link
                        href={`/patient/edit/${patient._id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-white text-sm rounded transition"
                      >
                        Editar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="border border-slate-300 px-4 py-8 text-center text-gray-500"
                >
                  Nenhum paciente encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="mt-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
