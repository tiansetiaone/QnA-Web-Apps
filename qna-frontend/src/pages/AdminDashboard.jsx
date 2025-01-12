import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import logo from "../assets/logos.png";
import icon6 from "../assets/history.png"; // Path menuju file logo
import icon7 from "../assets/list.png"; // Path menuju file logo
import icon9 from "../assets/logoff.png"; // Path menuju file logo
import icon10 from "../assets/information.png"; // Path menuju file logo
// import icon13 from "../assets/user-list.png"; // Path menuju file logo

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults] = useState([]);
  const [isLoading] = useState(false);
  const [error, setError] = useState("");

  // Fungsi logout
  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");

    // Arahkan kembali ke halaman login
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Masukkan kata kunci untuk mencari pertanyaan.");
      return;
    }
  
    // Navigasi ke halaman QnAList dengan query pencarian
    navigate("/admin/list", { state: { searchQuery } });
  };
  

  const backgroundColor1 = {
    backgroundColor: "#298B8B",
    color: "white",
  };
  const backgroundColor2 = {
    background: "linear-gradient(to right, #2C736D, #53D9CE)",
    color: "#2C736D",
  };

  return (
    <div className="admin-dashboard">
      <div className="logout-btn">
        <img
          src={icon9}
          alt="icon logoff"
          onClick={handleLogout} // Fungsi logout dipanggil saat gambar diklik
          title="Logout"
        />
      </div>
      <div className="logo1-container">
        <img src={logo} alt="Q&A Logo" />
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari pertanyaan..." />
        <button type="submit">Cari</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((question) => (
            <li key={question.id}>{question.question_text}</li>
          ))}
        </ul>
      )}
<div className="group-form-admin">
      <div className="input1-group">
        <div className="iconForm2">
          <img src={icon6} alt="icon-username" />
        </div>
        <div className="card" style={backgroundColor1} onClick={() => navigate("/admin/list")}>
          Riwayat Pertanyaan
        </div>
      </div>
      <div className="input1-group">
        <div className="iconForm2" style={backgroundColor2}>
          <img src={icon7} alt="icon-username" />
        </div>
        <div className="card" onClick={() => navigate("/admin/category")}>
          Atur Kategori
        </div>
      </div>
      {/* <div className="input1-group">
        <div className="iconForm2" >
          <img src={icon13} alt="icon-username" />
        </div>
        <div className="card"  style={backgroundColor1} onClick={() => navigate("/admin/uselist")}>
          Daftar Pengguna
        </div>
      </div> */}
      <div className="input1-group">
        <div className="iconForm2">
          <img src={icon10} alt="icon-username" />
        </div>
        <div className="card" style={backgroundColor1} onClick={() => navigate("/admin/bot")}>
          Cara Menggunakan Bot Chat
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
