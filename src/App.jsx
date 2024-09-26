import React from "react";
import { Routes, Route } from "react-router-dom";
import UserModal from "./components/container/UserModal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserModal />} />
    </Routes>
  );
}

export default App;
