import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Home } from "./pages/Home";
import { FormPage } from "./pages/FormPage";
import { SuccessPage } from "./pages/SuccessPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form/:id" element={<FormPage />} />
          <Route path="/success/:id" element={<SuccessPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
