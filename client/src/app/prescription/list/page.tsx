"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFilePdf, FaFileAlt, FaDownload, FaUpload } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

interface Prescription {
  _id: string;
  date: string;
  medicine: string;
  dosage: string;
  instructions: string;
  appointmentId: string;
  file?: string;
}

export default function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch(`${API_URL}/prescriptions`, {
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

  const downloadFile = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/readPrescription/${id}`, {
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

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

  const uploadPrescription = async (id: string) => {
    const file = selectedFiles[id];
    if (!file) {
      setError("Por favor, selecione um arquivo.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/uploadPrescription/${id}`, {
        method: "POST",
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: formData,
      });

      if (response.ok) {
        fetchPrescriptions();
        setSelectedFiles((prev) => {
          const newFiles = { ...prev };
          delete newFiles[id];
          return newFiles;
        });
      } else {
        throw new Error("Falha no upload");
      }
    } catch {
      setError("Erro ao fazer upload do arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const generatePrescription = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/generatePrescription/${id}`, {
        method: "GET",
        headers: {
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

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
        <h1 className="text-3xl font-bold text-teal-600 mb-2">Prescrições</h1>
        <p className="text-gray-600">
          Visualize, gerencie e baixe todas as prescrições do sistema
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded shadow-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {prescriptions.map((prescription) => (
          <div
            key={prescription._id}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Header do Card */}
            <div className="bg-teal-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-teal-800">
                  {formatDate(prescription.date)}
                </span>
                {prescription.file ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <FaFilePdf />
                    Disponível
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    <FaFileAlt />
                    Pendente
                  </span>
                )}
              </div>
            </div>

            {/* Conteúdo do Card */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Medicamento
                </h3>
                <p className="text-gray-700 text-sm">{prescription.medicine}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Dosagem</h3>
                <p className="text-gray-700 text-sm">{prescription.dosage}</p>
              </div>

              {prescription.instructions && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Instruções
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {prescription.instructions}
                  </p>
                </div>
              )}
            </div>

            {/* Ações do Card */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              {prescription.file ? (
                <button
                  onClick={() => downloadFile(prescription._id)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <FaDownload />
                  Baixar PDF
                </button>
              ) : (
                <div className="space-y-3">
                  {/* Upload de Arquivo */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Fazer Upload de Arquivo
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFiles((prev) => ({
                              ...prev,
                              [prescription._id]: file,
                            }));
                          }
                        }}
                        className="flex-1 text-xs border border-gray-300 rounded px-2 py-1"
                      />
                      <button
                        onClick={() => uploadPrescription(prescription._id)}
                        disabled={loading || !selectedFiles[prescription._id]}
                        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-xs font-medium transition flex items-center gap-1"
                      >
                        <FaUpload />
                        Upload
                      </button>
                    </div>
                  </div>

                  {/* Gerar PDF */}
                  <button
                    onClick={() => generatePrescription(prescription._id)}
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FaFileAlt />
                    Gerar PDF Automaticamente
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {prescriptions.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FaFileAlt className="mx-auto text-gray-400 text-4xl mb-4" />
            <p className="text-gray-500 font-medium">
              Nenhuma prescrição encontrada.
            </p>
            <Link
              href="/prescription/create"
              className="inline-block mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Criar Primera Prescrição
            </Link>
          </div>
        )}
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
