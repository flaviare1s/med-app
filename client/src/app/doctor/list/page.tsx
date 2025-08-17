"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Doctor {
  _id: string;
  name: string;
  login: string;
  password?: string;
  medicalSpecialty: string;
  medicalRegistration: string;
  email: string;
  phone: string;
}

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/doctors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch(() => setError("Failed to load doctors."));
  }, []);

  const deleteDoctor = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/doctors/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
      });

      const content = await response.json();
      if (content.login) {
        setDoctors(doctors.filter((doc) => doc._id !== id));
      } else if (content.error) {
        setError(content.error);
      }
    } catch {
      setError("Server error. Could not delete doctor.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <Link
        href="/home"
        className="mb-4 inline-block font-medium text-blue-600 hover:text-blue-800 transition"
      >
        &larr; Back to Dashboard
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
              <th className="p-3 border border-gray-200 text-left">Name</th>
              <th className="p-3 border border-gray-200 text-center">Login</th>
              <th className="p-3 border border-gray-200 text-center">
                Specialty
              </th>
              <th className="p-3 border border-gray-200 text-center">
                Medical Registration
              </th>
              <th className="p-3 border border-gray-200 text-center">Email</th>
              <th className="p-3 border border-gray-200 text-center">Phone</th>
              <th className="p-3 border border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="p-3 border border-gray-200">{doctor.name}</td>
                  <td className="p-3 border border-gray-200 text-center">
                    {doctor.login}
                  </td>
                  <td className="p-3 border border-gray-200 text-center">
                    {doctor.medicalSpecialty}
                  </td>
                  <td className="p-3 border border-gray-200 text-center">
                    {doctor.medicalRegistration}
                  </td>
                  <td className="p-3 border border-gray-200 text-center">
                    {doctor.email}
                  </td>
                  <td className="p-3 border border-gray-200 text-center">
                    {doctor.phone}
                  </td>
                  <td className="p-3 border border-gray-200 text-center flex justify-center gap-2">
                    <button
                      onClick={() => deleteDoctor(doctor._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-1 rounded flex items-center gap-1 transition w-6 h-6 justify-center"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      href={`/doctor/edit/${doctor._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 rounded flex items-center gap-1 transition w-6 h-6 justify-center"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-4 text-center text-gray-500 font-medium"
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
