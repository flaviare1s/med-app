"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Patient {
  _id: string;
  name: string;
  birthDate: string;
  email: string;
  phone: string;
}

export default function PatientEdit({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = params.id;

  const [patient, setPatient] = useState<Patient>({
    _id: "",
    name: "",
    birthDate: "",
    email: "",
    phone: "",
  });
  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Fetch patient data on mount
  useEffect(() => {
    fetch(`http://127.0.0.1:3001/patients/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Format date to YYYY-MM-DD for input[type="date"]
        const formattedDate = data.birthDate?.substring(0, 10) || "";
        setPatient({ ...data, birthDate: formattedDate });
        setName(data.name);
        setBirthDate(formattedDate);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch(() => setError("Failed to load patient data."));
  }, [id]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const formData = {
      name: name || patient.name,
      birthDate: birthDate || patient.birthDate,
      email: email || patient.email,
      phone: phone || patient.phone,
    };

    try {
      const response = await fetch(`http://127.0.0.1:3001/patients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("token") || "",
        },
        body: JSON.stringify(formData),
      });

      const content = await response.json();

      if (content._id) {
        router.push("/patient/list");
      } else {
        setError(content.error || "Failed to update patient.");
      }
    } catch {
      setError("Server error. Could not update patient.");
    }
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-gray-50">
      <Link
        href="/patient/list"
        className="mb-4 inline-block font-medium text-blue-600 hover:text-blue-800 transition"
      >
        &larr; Back to Patient List
      </Link>

      <form
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6"
        onSubmit={handleEdit}
      >
        <h2 className="text-2xl font-bold text-yellow-500 mb-4 underline">
          Edit Patient
        </h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            Save
          </button>
          <Link
            href="/patient/list"
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
          >
            Cancel
          </Link>
        </div>

        {error && (
          <div className="mt-4 p-2 text-red-700 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
