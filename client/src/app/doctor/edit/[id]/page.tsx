/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DoctorEdit(params: any) {
  const router = useRouter();
  const id = params.params.id;

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
    fetch(`http://127.0.0.1:3001/doctors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((response) => response.json())
      .then((data) => setDoctor(data))
      .catch(() => setError("Failed to load doctor data."));
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
      const response = await fetch(`http://127.0.0.1:3001/doctors/${id}`, {
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
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
        <Link
          href="/doctor/list"
          className="text-teal-600 hover:text-teal-800 font-semibold"
        >
          &larr; Back to Doctor List
        </Link>

        <h1 className="text-3xl font-bold text-teal-600 text-center">
          Edit Doctor
        </h1>

        {error && (
          <div className="text-center text-red-700 bg-red-50 border border-red-200 p-3 rounded-md font-medium shadow-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={edit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter doctor's name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Login</label>
            <input
              type="text"
              placeholder="Enter login"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.login}
              onChange={(e) => setLogin(e.target.value)}
            />
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
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Medical Specialty
            </label>
            <input
              type="text"
              placeholder="Enter specialty"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.medicalSpecialty}
              onChange={(e) => setMedicalSpecialty(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Medical Registration
            </label>
            <input
              type="text"
              placeholder="Enter registration number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.medicalRegistration}
              onChange={(e) => setMedicalRegistration(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              defaultValue={doctor.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Phone</label>
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
            Update Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
