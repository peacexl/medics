/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const ConsultationContext = createContext();

export const ConsultationProvider = ({ children }) => {
  const [consultations, setConsultations] = useState(() => {
    const saved = localStorage.getItem("consultations");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("consultations", JSON.stringify(consultations));
  }, [consultations]);

  const addConsultation = (data) => {
    setConsultations((prev) => [...prev, data]);
  };

  const deleteConsultation = (index) => {
    setConsultations((prev) => prev.filter((_, i) => i !== index));
  };

  const clearConsultations = () => {
    setConsultations([]);
    localStorage.removeItem("consultations");
  };

  return (
    <ConsultationContext.Provider
      value={{
        consultations,
        addConsultation,
        deleteConsultation,
        clearConsultations,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultations = () => useContext(ConsultationContext);

// ✅ Add this line to fix the error
export default ConsultationContext;
