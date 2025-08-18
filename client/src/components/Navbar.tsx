"use client";

import React, { useState } from "react";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import {
  FaUserMd,
  FaUsers,
  FaPrescriptionBottle,
  FaCalendarAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStateChange = (state: { isOpen: boolean }) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuStyles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "20px",
      top: "20px",
      display: "none",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#373a47",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  return (
    <>
      <nav className="hidden lg:flex bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/home" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-teal-600">MedApp</span>
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaUserMd className="text-lg" />
                  <span>Médicos</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <Link
                      href="/doctor/create"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      Cadastrar Médico
                    </Link>
                    <Link
                      href="/doctor/list"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      Listar Médicos
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaUsers className="text-lg" />
                  <span>Pacientes</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <Link
                      href="/patient/create"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      Cadastrar Paciente
                    </Link>
                    <Link
                      href="/patient/list"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      Listar Pacientes
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaCalendarAlt className="text-lg" />
                  <span>Consultas</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <Link
                      href="/appointment/create"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      Agendar Consulta
                    </Link>
                    <Link
                      href="/appointment/list"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      Listar Consultas
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  <FaPrescriptionBottle className="text-lg" />
                  <span>Prescrições</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <Link
                      href="/prescription/create"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                    >
                      Criar Prescrição
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center h-16 px-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <FaBars size={24} />
          </button>

          <Link href="/home" className="text-xl font-bold text-teal-600">
            MedApp
          </Link>

          <div className="w-12"></div>
        </div>
      </nav>

      <Menu
        styles={menuStyles}
        isOpen={isMenuOpen}
        onStateChange={handleStateChange}
        customBurgerIcon={false}
        customCrossIcon={false}
        disableAutoFocus
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="mb-8 mt-8">
          <Link
            href="/home"
            onClick={closeMenu}
            className="text-white text-2xl font-bold"
          >
            MedApp
          </Link>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-teal-300 font-semibold mb-2 flex items-center">
              <FaUserMd className="mr-2" />
              Médicos
            </div>
            <div className="ml-6 space-y-2">
              <Link
                href="/doctor/create"
                onClick={closeMenu}
                className="block text-gray-300 hover:text-white"
              >
                Cadastrar Médico
              </Link>
              <Link
                href="/doctor/list"
                onClick={closeMenu}
                className="block text-gray-300 hover:text-white"
              >
                Listar Médicos
              </Link>
            </div>
          </div>

          <div>
            <div className="text-teal-300 font-semibold mb-2 flex items-center">
              <FaUsers className="mr-2" />
              Pacientes
            </div>
            <div className="ml-6 space-y-2">
              <Link
                href="/patient/create"
                onClick={closeMenu}
                className="block text-gray-300 hover:text-white"
              >
                Cadastrar Paciente
              </Link>
              <Link
                href="/patient/list"
                onClick={closeMenu}
                className="block text-gray-300 hover:text-white"
              >
                Listar Pacientes
              </Link>
            </div>
          </div>

          <div>
            <div className="text-teal-300 font-semibold mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              Consultas
            </div>
            <div className="ml-6 space-y-2">
              <Link
                href="/appointment/create"
                onClick={closeMenu}
                className="block text-gray-300 hover:text-white"
              >
                Agendar Consulta
              </Link>
              <Link
                href="/appointment/list"
                onClick={closeMenu}
                className="block text-gray-300 hover:text-white"
              >
                Listar Consultas
              </Link>
            </div>
          </div>

          <div>
            <div className="text-teal-300 font-semibold mb-2 flex items-center">
              <FaPrescriptionBottle className="mr-2" />
              Prescrições
            </div>
            <div className="ml-6 space-y-2">
              <Link
                href="/prescription/create"
                onClick={closeMenu}
                className="block text-gray-300 hover:text-white"
              >
                Criar Prescrição
              </Link>
            </div>
          </div>
        </div>
      </Menu>
    </>
  );
};

export default Navbar;
