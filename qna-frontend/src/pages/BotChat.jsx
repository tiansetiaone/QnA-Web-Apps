import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "../styles/BotChat.css";
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png";


const Bot = () => {
  const navigate = useNavigate();

  const [profil, setProfil] = useState({
    id : "",
  });


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan. Silakan login kembali.");
          return;
        }

        const response = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfil({
          id: response.data.id || "",
          username: response.data.username || "",
          whatsapp: response.data.whatsapp_number || "",
        });
      } catch (error) {
        console.error("Gagal memuat profil:", error.response || error.message);
      }
    };

    fetchProfile();
  }, []);


  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bot-question-container">
      <header className="bot-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          &lt; Back
        </button>
        <div className="header-content">
          <div className="logo-qna">
            <img src={logo} alt="Q&A Logo" />
          </div>
          <h1 className="title-lookAsk">Informasi</h1>
        </div>
        <div className="logout-btn-qna">
          <img
            src={icon9}
            alt="icon logoff"
            onClick={handleLogout}
            style={{ cursor: "pointer", width: "30px", height: "30px" }}
            title="Logout"
          />
        </div>
      </header>
      <div className="askquestion-container">
        <div className="formAskquestion">
            <div className="info">
                <h1>Cara Menggunakan Chat Bot by WhatsApp</h1>
                <p>1. Mengirim pertanyaan melalui nomor Whatsapp Admin, baik melalui pesan langsung atau group Whatsapp.</p>
                <p>2. Mengirim bot chat dengan cara mengetik : </p>
                <strong><p>!question [tokenbot] [pertanyaan] </p></strong>
                <p>- Contoh : !question 1 Tolong sebutkan nama penemu Tesla ? </p>
                <p>3. Kirim pesan, dan tunggu respon jawaban pada situs QNA Apps</p>
            </div>
        </div>
      </div>
      <div className="askquestion-container">
        <div className="formAskquestion">
            <div className="info">
                <h1>Keterangan</h1>
                <strong><p>Token Bot Anda : {profil.id} </p></strong>
            </div>
        </div>
      </div>
      <footer>Developed By : Setiaone Corps.</footer>
    </div>
  );
};

export default Bot;
