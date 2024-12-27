import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Articles from "./pages/Articles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
