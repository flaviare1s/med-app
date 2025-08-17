import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 sm:p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-teal-600 mb-8">
        MedApp Dashboard
      </h1>

      <div className="w-full max-w-3xl grid gap-6 sm:grid-cols-2">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-blue-700">Doctors</h2>
          <Link
            href="/doctor/create"
            className="block bg-teal-500 hover:bg-teal-600 text-white text-center py-2 rounded-lg transition"
          >
            Create new doctor
          </Link>
          <Link
            href="/doctor/list"
            className="block bg-blue-100 hover:bg-blue-200 text-blue-700 text-center py-2 rounded-lg transition"
          >
            List all doctors
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-blue-700">Pacients</h2>
          <Link
            href="/patient/create"
            className="block bg-teal-500 hover:bg-teal-600 text-white text-center py-2 rounded-lg transition"
          >
            Create new pacient
          </Link>
          <Link
            href="/patient/list"
            className="block bg-blue-100 hover:bg-blue-200 text-blue-700 text-center py-2 rounded-lg transition"
          >
            List all pacients
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 sm:col-span-2">
          <h2 className="text-2xl font-semibold text-blue-700">Appointments</h2>
          <Link
            href="/appointment/create"
            className="block bg-teal-500 hover:bg-teal-600 text-white text-center py-2 rounded-lg transition"
          >
            Create new appointment
          </Link>
          <Link
            href="/appointment/list"
            className="block bg-blue-100 hover:bg-blue-200 text-blue-700 text-center py-2 rounded-lg transition"
          >
            List all appointments
          </Link>
        </div>
      </div>
    </div>
  );
}
