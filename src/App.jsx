import { Routes, Route } from "react-router-dom";
import CassetteSender from "./components/CassetteSender";
import CassettePlayer from "./components/CassettePlayer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CassetteSender />} />
      <Route path="/c/:shareId" element={<CassettePlayer />} />
    </Routes>
  );
}
