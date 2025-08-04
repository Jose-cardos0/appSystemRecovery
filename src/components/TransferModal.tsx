import React, { useState } from "react";
import { useApp } from "../context/AppContext";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransferModal({ isOpen, onClose }: TransferModalProps) {
  const { userData, updateUserData } = useApp();
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const transferAmount = Number(amount);

    if (transferAmount <= 0 || transferAmount > userData.salary) {
      return;
    }

    // Update salary
    const newSalary = Number((userData.salary - transferAmount).toFixed(2));
    updateUserData({ salary: newSalary });

    // Create notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#424242]/60 text-white px-4 py-3 rounded-[20px] flex items-center gap-3 shadow-lg z-50 w-[90%] max-w-[360px]";
    notification.style.backdropFilter = "blur(0px)";
    notification.innerHTML = `
      <div class="flex items-center gap-3 w-full">
        <img src="https://i.ibb.co/bgqnF9Mv/icongoogle.png" alt="Google" class="w-7 h-7" />
        <div class="flex-1">
          <p class="font-medium text-[14px] leading-tight">Transfer completed successfully</p>
          <p class="text-[13px] text-white/90">You transferred: US$ ${transferAmount.toFixed(
            2
          )}</p>
        </div>
        <span class="text-[13px] text-white/70 self-start">Now</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 6000);

    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Transfer money</h2>

          <div className="bg-[#F1F2FF] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#1A0FB0]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span className="font-medium">My salary</span>
            </div>
            <p className="text-[#00A650] font-medium">
              US$ {userData.salary.toFixed(2)}
            </p>
          </div>

          <form onSubmit={handleTransfer} className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2">
                How much do you want to transfer?
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full p-3 bg-[#EFEEFF] rounded-lg border-none focus:ring-2 focus:ring-[#1A0FB0]"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-xl font-medium border-2 border-[#1A0FB0] text-[#1A0FB0]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#1A0FB0] text-white py-4 rounded-xl font-medium"
              >
                Transfer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
