import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Articles from "./pages/Articles";
import Dashboard from "./pages/Dashboard";
import FileUpload from "./pages/FileUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        {/* <Route path="/" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
