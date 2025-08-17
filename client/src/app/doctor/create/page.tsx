"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DoctorCreate() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [medicalSpecialty, setMedicalSpecialty] = useState<string>("");
  const [medicalRegistration, setMedicalRegistration] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Aqui guardamos erros de cada campo individualmente
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const addDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const formData = {
      name,
      login,
      password,
      medicalSpecialty,
      medicalRegistration,
      email,
      phone,
    };

    try {
      const response = await fetch("http://127.0.0.1:3001/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (content.login) {
        router.push("/home");
      } else if (content.errors) {
        setFieldErrors(content.errors);
      } else if (content.error) {
        setGeneralError(content.error);
      } else {
        setGeneralError("Failed to create doctor.");
      }
    } catch (err) {
      setGeneralError("Server error. Please try again.");
    }
  };

  const renderFieldError = (field: string) =>
    fieldErrors[field] ? (
      <span className="text-red-600 text-sm mt-1">{fieldErrors[field]}</span>
    ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
        <Link
          href="/home"
          className="text-teal-600 hover:text-teal-800 font-semibold"
        >
          &larr; Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-teal-600 text-center">
          Create Doctor
        </h1>

        {generalError && (
          <div className="text-center text-red-700 bg-red-50 border border-red-200 p-3 rounded-md font-medium shadow-sm">
            {generalError}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={addDoctor} noValidate>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter doctor's name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setName(e.target.value)}
            />
            {renderFieldError("name")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Login</label>
            <input
              type="text"
              placeholder="Enter login"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setLogin(e.target.value)}
            />
            {renderFieldError("login")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
            {renderFieldError("password")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Medical Specialty
            </label>
            <input
              type="text"
              placeholder="Enter specialty"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setMedicalSpecialty(e.target.value)}
            />
            {renderFieldError("medicalSpecialty")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Medical Registration
            </label>
            <input
              type="text"
              placeholder="Enter registration number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setMedicalRegistration(e.target.value)}
            />
            {renderFieldError("medicalRegistration")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
            {renderFieldError("email")}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Phone</label>
            <input
              type="tel"
              placeholder="99 91234-4567"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={(e) => setPhone(e.target.value)}
            />
            {renderFieldError("phone")}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Create Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
