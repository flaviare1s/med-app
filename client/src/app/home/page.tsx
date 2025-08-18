"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [showMotivationalPhrase, setShowMotivationalPhrase] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const motivationalPhrases = [
    "Cuidando da vida, um paciente por vez.",
    "A tecnologia a serviço da saúde.",
    "Facilitando o cuidado médico para todos.",
    "Onde a medicina encontra a inovação.",
    "Sua saúde, nossa prioridade.",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMotivationalPhrase(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showMotivationalPhrase) {
      const phraseTimer = setInterval(() => {
        setCurrentPhraseIndex(
          (prevIndex) => (prevIndex + 1) % motivationalPhrases.length
        );
      }, 4000);

      return () => clearInterval(phraseTimer);
    }
  }, [showMotivationalPhrase, motivationalPhrases.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-6 sm:p-10 flex flex-col items-center justify-center">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-teal-600 mb-6 animate-fade-in">
            Bem-vindo ao MedApp
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 animate-fade-in-delay">
            Sistema de Gestão Médica Inteligente
          </p>
        </div>

        <div className="h-24 flex items-center justify-center">
          {showMotivationalPhrase && (
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-700 font-medium italic animate-slide-up">
              &quot;{motivationalPhrases[currentPhraseIndex]}&quot;
            </p>
          )}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Médicos
            </h3>
            <p className="text-sm text-gray-600">
              Gerencie profissionais de saúde
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Pacientes
            </h3>
            <p className="text-sm text-gray-600">Cadastro e acompanhamento</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Consultas
            </h3>
            <p className="text-sm text-gray-600">Agendamento inteligente</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Prescrições
            </h3>
            <p className="text-sm text-gray-600">Controle de medicamentos</p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-gray-600 text-lg">
            Utilize a navegação acima para acessar todas as funcionalidades do
            sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
