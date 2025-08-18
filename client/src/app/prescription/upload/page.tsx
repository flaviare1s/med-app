"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaUpload, FaDownload, FaFilePdf, FaFileAlt } from "react-icons/fa";

interface Prescription {
  _id: string;
  date: string;
  medicine: string;
  dosage: string;
  instructions: string;
  file?: string;
}

export default function PrescriptionManagement() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/prescriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });
      const data = await response.json();
      setPrescriptions(data);
    } catch {
      setError("Falha ao carregar prescrições.");
    }
  };

  const uploadPrescription = async (id: string) => {
    if (!file) {
      setError("Por favor, selecione um arquivo.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `http://127.0.0.1:3001/uploadPrescription/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
          body: formData,
        }
      );

      if (response.ok) {
        fetchPrescriptions();
        setFile(null);
      } else {
        throw new Error("Falha no upload");
      }
    } catch {
      setError("Erro ao fazer upload do arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (id: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3001/readPrescription/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `prescricao_${id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("Falha ao baixar arquivo");
      }
    } catch {
      setError("Erro ao baixar arquivo.");
    }
  };

  const generatePrescription = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:3001/generatePrescription/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: sessionStorage.getItem("token") || "",
          },
        }
      );

      if (response.ok) {
        const content = await response.json();
        if (content._id) {
          fetchPrescriptions();
        } else {
          setError("Erro ao gerar prescrição.");
        }
      } else {
        throw new Error("Falha ao gerar prescrição");
      }
    } catch {
      setError("Erro ao gerar prescrição.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50">
      <Link
        href="/home"
        className="mb-4 inline-block font-medium text-teal-600 hover:text-teal-800 transition"
      >
        &larr; Voltar ao Dashboard
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-2">
          Gerenciar Prescrições
        </h1>
        <p className="text-gray-600">
          Faça upload de arquivos ou gere prescrições automaticamente
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm">
          {error}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-3 border border-gray-200 text-left">Data</th>
              <th className="p-3 border border-gray-200 text-center">
                Medicamento
              </th>
              <th className="p-3 border border-gray-200 text-center">
                Dosagem
              </th>
              <th className="p-3 border border-gray-200 text-center">
                Instruções
              </th>
              <th className="p-3 border border-gray-200 text-center">Status</th>
              <th className="p-3 border border-gray-200 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr
                key={prescription._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="p-3 border border-gray-200">
                  {formatDate(prescription.date)}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {prescription.medicine}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {prescription.dosage}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {prescription.instructions || "N/A"}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  {prescription.file ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      <FaFilePdf />
                      Arquivo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      <FaFileAlt />
                      Pendente
                    </span>
                  )}
                </td>
                <td className="p-3 border border-gray-200 text-center">
                  <div className="flex justify-center gap-2 flex-wrap">
                    {!prescription.file && (
                      <>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                              setFile(e.target.files?.[0] || null)
                            }
                            className="text-xs"
                          />
                          <button
                            onClick={() => uploadPrescription(prescription._id)}
                            disabled={loading || !file}
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-2 rounded transition flex items-center gap-1 text-xs"
                          >
                            <FaUpload />
                            Upload
                          </button>
                        </div>
                        <button
                          onClick={() => generatePrescription(prescription._id)}
                          disabled={loading}
                          className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white p-2 rounded transition flex items-center gap-1 text-xs"
                        >
                          <FaFileAlt />
                          Gerar PDF
                        </button>
                      </>
                    )}
                    {prescription.file && (
                      <button
                        onClick={() => downloadFile(prescription._id)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition flex items-center gap-1 text-xs"
                      >
                        <FaDownload />
                        Baixar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {prescriptions.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  Nenhuma prescrição encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-center">Processando...</p>
          </div>
        </div>
      )}
    </div>
  );
}
