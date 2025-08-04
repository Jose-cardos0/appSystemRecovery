import React, { createContext, useContext, useState, useEffect } from "react";
import { Form, UserData } from "../types";

interface AppContextData {
  userData: UserData;
  availableForms: Form[];
  updateUserData: (data: Partial<UserData>) => void;
  completeForm: (formId: string) => void;
  getFormReward: (formId: string) => number;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

const INITIAL_USER_DATA: UserData = {
  balance: 741.72,
  completedForms: 47,
  salary: 2343.37,
  totalFormsValue: 741.72,
};

const INITIAL_FORMS: Form[] = [
  {
    id: "1",
    title: "Redemption",
    type: "Idle Money",
    reward: 12.45,
    image:
      "https://itsmoney.com.br/_next/image?url=https%3A%2F%2Fitsmoney-admin.investimentosblue.com.br%2Fapp%2Fuploads%2F2023%2F11%2Fshutterstock_2277122315.webp&w=1920&q=75",
  },
  {
    id: "2",
    title: "Redemption",
    type: "Idle Money",
    reward: 15.89,
    image:
      "https://itsmoney.com.br/_next/image?url=https%3A%2F%2Fitsmoney-admin.investimentosblue.com.br%2Fapp%2Fuploads%2F2023%2F11%2Fshutterstock_2277122315.webp&w=1920&q=75",
  },
  {
    id: "3",
    title: "Redemption",
    type: "Idle Money",
    reward: 9.78,
    image:
      "https://itsmoney.com.br/_next/image?url=https%3A%2F%2Fitsmoney-admin.investimentosblue.com.br%2Fapp%2Fuploads%2F2023%2F11%2Fshutterstock_2277122315.webp&w=1920&q=75",
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const saved = localStorage.getItem("@AppAvaliee:userData");
      return saved
        ? { ...INITIAL_USER_DATA, ...JSON.parse(saved) }
        : INITIAL_USER_DATA;
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      return INITIAL_USER_DATA;
    }
  });

  const [availableForms] = useState<Form[]>(INITIAL_FORMS);

  useEffect(() => {
    localStorage.setItem("@AppAvaliee:userData", JSON.stringify(userData));
  }, [userData]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const getFormReward = (formId: string): number => {
    const form = availableForms.find((f) => f.id === formId);
    return form ? form.reward : 0;
  };

  const completeForm = (formId: string) => {
    const form = availableForms.find((f) => f.id === formId);
    if (form) {
      // Atualiza o salário somando a recompensa
      const newSalary = Number((userData.salary + form.reward).toFixed(2));

      // Diminui o valor total dos formulários disponíveis
      const newTotalFormsValue = Number(
        (userData.totalFormsValue - form.reward).toFixed(2)
      );

      // Atualiza o saldo e incrementa o contador de formulários
      const newBalance = Number((userData.balance + form.reward).toFixed(2));
      const newCompletedForms = userData.completedForms + 1;

      updateUserData({
        salary: newSalary,
        balance: newBalance,
        completedForms: newCompletedForms,
        totalFormsValue: newTotalFormsValue,
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        availableForms,
        updateUserData,
        completeForm,
        getFormReward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
