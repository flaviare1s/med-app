import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <nav>
        <Link href="/doctor/create">Create a new doctor</Link>
        <Link href="/patient/create">Create a new patient</Link>
        <Link href="/appointment/create">Create a new appointment</Link>
        <Link href="/prescription/create">Create a new prescription</Link>
      </nav>
    </>
  );
}
