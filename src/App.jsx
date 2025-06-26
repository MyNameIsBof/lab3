import "./App.css";
import MyNavbar from "./components/MyNavbar";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Contact from "./components/pages/Contact";
import CodeAntDashboard from "./components/CodeAntDashboard";
import CodeAntDemoComparison from "./components/demo/CodeAntDemoComparison";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Detail from "./components/pages/Detail";
import Management from "./components/Management";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/codeant" element={<CodeAntDashboard />} />
        <Route path="/codeant-demo" element={<CodeAntDemoComparison />} />
        <Route path="/student/:id" element={<Detail />} />

        <Route path="/management" element={<Management />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
