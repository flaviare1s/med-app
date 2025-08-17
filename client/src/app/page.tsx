"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorServer, setErrorServer] = useState<string | null>(null);

  const authentication = async (e: React.FormEvent) => {
    e.preventDefault();

    // reset errors
    setErrorLogin(null);
    setErrorPassword(null);
    setErrorServer(null);

    let valid = true;

    if (!login) {
      setErrorLogin("Digite seu usuário");
      valid = false;
    }

    if (!password) {
      setErrorPassword("Digite sua senha");
      valid = false;
    }

    if (!valid) return;

    const formData = { login, password };

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (content.token) {
        sessionStorage.setItem("token", content.token);
        router.push("/home");
      } else {
        setErrorServer("Usuário ou senha inválidos");
      }
    } catch (err) {
      setErrorServer("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <form
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 sm:p-10 flex flex-col gap-6"
        onSubmit={authentication}
        noValidate
      >
        <h1 className="text-3xl font-bold text-teal-600 text-center">Login</h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Usuário</label>
          <input
            type="text"
            name="login"
            placeholder="Digite seu usuário"
            autoComplete="off"
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-400 transition ${
              errorLogin
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300"
            }`}
            onChange={(e) => setLogin(e.target.value)}
          />
          {errorLogin && (
            <span className="text-red-600 text-sm mt-1">{errorLogin}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            autoComplete="off"
            className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-400 transition ${
              errorPassword
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300"
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword && (
            <span className="text-red-600 text-sm mt-1">{errorPassword}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Entrar
        </button>

        {errorServer && (
          <div className="text-center text-red-700 bg-red-50 border border-red-200 p-3 rounded-md font-medium shadow-sm">
            {errorServer}
          </div>
        )}

        <p className="text-center text-gray-500 text-sm mt-2">
          OBS.: Para testar a aplicação, use usuário: <b>teste</b> e senha:{" "}
          <b>1234</b>
        </p>
      </form>
    </div>
  );
}
