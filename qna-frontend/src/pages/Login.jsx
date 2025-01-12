import React, { useState } from "react";
import axios from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logos.png"; // Path menuju file logo
import icon1 from "../assets/username.png"; // Path menuju file username icon
import icon3 from "../assets/pass.png"; // Path menuju file password icon

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!username || !password) {
      setErrorMessage("Username dan Password wajib diisi.");
      alert("Username dan Password wajib diisi.");
      return;
    }

    try {
      const { data } = await axios.post("/auth/login", { username, password });

      // Debug respons server
      console.log("Respons server:", data);
      console.log("Role pengguna:", data.user?.role);

      // Simpan token dan adminId ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "adminId",
        data.user.role === "admin" ? data.user.id : null // Hanya simpan adminId jika role adalah admin
      );

      // Redirect berdasarkan role
      const role = data.user?.role;
      if (role === "admin") {
        navigate("/Admin"); // Halaman adminDashboard
      } else if (role === "user") {
        navigate("/User"); // Halaman userDashboard
      } else {
        console.error("Role tidak dikenali");
        alert("Role pengguna tidak dikenali.");
      }
    } catch (error) {
      console.error("Login gagal:", error.response?.data?.error || error.message);

      if (error.response?.data?.error) {
        const serverError = error.response.data.error;

        if (serverError.includes("Invalid password")) {
          setErrorMessage("Password yang Anda masukkan salah.");
          alert("Password yang Anda masukkan salah.");
        } else if (serverError.includes("Username tidak ditemukan")) {
          setErrorMessage("Username tidak ditemukan.");
          alert("Username tidak ditemukan.");
        } else {
          setErrorMessage("Login gagal. Periksa kembali username dan password Anda.");
          alert("Login gagal. Periksa kembali username dan password Anda.");
        }
      } else {
        setErrorMessage("Login gagal. Periksa kembali username dan password Anda..");
        alert("Terjadi kesalahan jaringan. Coba lagi nanti.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="signIn">MASUK</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group-reg">
            <div className="iconForm">
              <img src={icon1} alt="icon-username" />
            </div>
            <input
              type="text"
              placeholder="Username / No.WA.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group-reg">
            <div className="iconForm">
              <img src={icon3} alt="icon-pass" />
            </div>
            <input
              type="password"
              placeholder="Isi Password.."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <p>
            Belum Punya Akun? <a href="/Register">Daftar disini</a>
          </p>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="logo-container">
        <img src={logo} alt="Q&A Logo" />
        <h1>APP.</h1>
      </div>
    </div>
  );
};

export default Login;
