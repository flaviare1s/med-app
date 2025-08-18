/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";

export default function DoctorEdit({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>("");

  // Resolver params no lado do cliente
  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const [doctor, setDoctor] = useState<any>({
    name: "",
    login: "",
    password: "",
    medicalSpecialty: "",
    medicalRegistration: "",
    email: "",
    phone: "",
  });

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [medicalSpecialty, setMedicalSpecialty] = useState<string>("");
  const [medicalRegistration, setMedicalRegistration] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Aguardar o id ser resolvido
    
    fetch(`${API_URL}/doctors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => setDoctor(data))
      .catch(() => setError("Falha ao carregar dados do médico."));
  }, [id]);

  const edit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = {
      name: name || doctor.name,
      login: login || doctor.login,
      password: password || doctor.password,
      medicalSpecialty: medicalSpecialty || doctor.medicalSpecialty,
      medicalRegistration: medicalRegistration || doctor.medicalRegistration,
      email: email || doctor.email,
      phone: phone || doctor.phone,
    };

    try {
      const response = await fetch(`${API_URL}/doctors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (content.login) {
        router.push("/doctor/list");
      } else if (content.error) {
        setError(content.error);
      }
    } catch {
      setError("Erro do servidor. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
        <Link
          href="/doctor/list"
          className="text-teal-600 hover:text-teal-800 font-semibold"
        >
          &larr; Voltar à Lista de Médicos
        </Link>

        <h1 className="text-3xl font-bold text-teal-600 text-center">
          Atualizar Médico
        </h1>

        {error && (
          <div className="text-center text-red-700 bg-red-50 border border-red-200 p-3 rounded-md font-medium shadow-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={edit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Nome</label>
            <input
              type="text"
              placeholder="Digite o nome do médico"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Nome de Usuário
            </label>
            <input
              type="text"
              placeholder="Digite o login"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Senha</label>
            <input
              type="password"
              placeholder="Digite a senha"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Especialidade Médica
            </label>
            <input
              type="text"
              placeholder="Digite a especialidade"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.medicalSpecialty}
              onChange={(e) => setMedicalSpecialty(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Registro Médico
            </label>
            <input
              type="text"
              placeholder="Digite o número do registro"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.medicalRegistration}
              onChange={(e) => setMedicalRegistration(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Digite o email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              placeholder="99 91234-4567"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
