import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function FormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeForm, availableForms } = useApp();

  // Find the correct form based on ID
  const formData = availableForms.find((form) => form.id === id) || {
    id: "1",
    title: "Redemption",
    type: "Idle Money",
    reward: 12.45,
    image:
      "https://itsmoney.com.br/_next/image?url=https%3A%2F%2Fitsmoney-admin.investimentosblue.com.br%2Fapp%2Fuploads%2F2023%2F11%2Fshutterstock_2277122315.webp&w=1920&q=75",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeForm(id || "");
    navigate("/success/" + id);
  };

  return (
    <div className="min-h-screen bg-[#F1F2FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
        <img
          src={formData.image}
          alt={formData.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-2">{formData.title}</h1>
          <p className="text-gray-600 mb-4">Type: {formData.type}</p>

          <div className="bg-[#FFFF] rounded-xl p-4 mb-6">
            <p className="text-primary font-medium">
              You will receive US$ {formData.reward.toFixed(2)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <button
              type="submit"
              className="w-full bg-[#1A0FB0] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              REDEEM
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
