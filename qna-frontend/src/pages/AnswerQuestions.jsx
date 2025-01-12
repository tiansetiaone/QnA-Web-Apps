import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosConfig";
import "../styles/AnswerQuestions.css"; // Pastikan file CSS tersedia
import logo from "../assets/logos.png";
import icon9 from "../assets/logoff.png";

const AnswerQuestions = () => {
  const { questionId } = useParams(); // Ambil questionId dari URL
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State untuk daftar kategori
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori yang dipilih

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId"); // Bersihkan adminId saat logout
    navigate("/");
  };

    // Fetch detail pertanyaan dan kategori
    useEffect(() => {

      const fetchDetails = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setError("Token tidak ditemukan. Silakan login ulang.");
            return;
          }
  
          const questionResponse = await axios.get(`/questions/details/${questionId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setQuestion(questionResponse.data.question);
  
          const categoriesResponse = await axios.get("/categories", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!token) {
            setError("Token tidak ditemukan. Silakan login ulang.");
            console.error("Token tidak ditemukan");
            return;
          }          
          console.log("Response dari /categories:", categoriesResponse.data);
          setCategories(categoriesResponse.data);
        } catch (error) {
          console.error("Error fetching details:", error);
          setError("Gagal memuat data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchDetails();
    }, [questionId]);

    const handleCategoryChange = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token tidak ditemukan. Silakan login ulang.");
          return;
        }
  
        await axios.put(
          `/questions/${questionId}/update`,
          { categoryId: selectedCategory },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        setSuccessMessage("Kategori berhasil diperbarui.");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        console.error("Gagal memperbarui kategori:", error);
        setError("Gagal memperbarui kategori. Silakan coba lagi.");
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const adminId = localStorage.getItem("adminId"); // Ambil adminId dari localStorage
      const token = localStorage.getItem("token"); // Ambil token dari localStorage

      // Validasi keberadaan adminId dan token
      if (!adminId) {
        setError("Admin ID tidak ditemukan. Silakan login ulang.");
        return;
      }
      if (!token) {
        setError("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      const response = await axios.post(
        `/answers/${questionId}/answers`,
        {
          questionId, // Tambahkan questionId ke payload
          answerText,
          adminId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Menangani pesan sukses
      setSuccessMessage(response.data.message);
      setAnswerText(""); // Reset form jawaban
      setTimeout(() => navigate("/admin/list"), 2000); // Redirect ke daftar QnA
    } catch (err) {
      console.error("Gagal mengirim jawaban:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Gagal mengirim jawaban. Silakan coba lagi.");
    }
  };

  return (
    <div className="answer-container">
      <header className="answer-header1">
        <div className="back-button" onClick={() => navigate(-1)}>
          &lt; Back
        </div>
        <div className="header-content">
          <div className="logo-qna">
            <img src={logo} alt="Q&A Logo" />
          </div>
          <h1 className="title-lookAsk">Jawab Pertanyaan</h1>
        </div>
        <div className="logout-btn-qna">
          <img src={icon9} alt="icon logoff" onClick={handleLogout} style={{ cursor: "pointer", width: "30px", height: "30px" }} title="Logout" />
        </div>
      </header>
      <div className="question-answer-container1">
        <div className="questions-list-answer">
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          {loading ? (
            <p>Memuat detail pertanyaan...</p>
          ) : question ? (
            <div className="question-details">
              <p>
                <strong>Penanya:</strong> {question.username}
              </p>
              <p>
                <strong>Tanggal:</strong> {new Date(question.created_at).toLocaleDateString()} {new Date(question.created_at).toLocaleTimeString()}
              </p>
              <p>
                <strong>Kategori:</strong> {question.category_name || "Tidak diketahui"}
              </p>
              <p>
                <strong>Pertanyaan:</strong> {question.question_text}
              </p>
              <div>
                <label htmlFor="category">Pilih Kategori: </label>
                <select
  id="category"
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="">Pilih Kategori</option>
  {categories && categories.length > 0
    ? categories.map((cat) => {
        console.log("Rendering kategori:", cat); // Tambahkan log ini
        return (
          <option key={cat.id} value={cat.id}>
            {cat.category_name}
          </option>
        );
      })
    : null}
</select>
                <button onClick={handleCategoryChange} disabled={!selectedCategory}>
                  Update Kategori
                </button>
              </div>
            </div>
          ) : (
            <p>Detail pertanyaan tidak ditemukan.</p>
          )}
        </div>

        <div className="formAnswer1">
          <form onSubmit={handleSubmit} className="answer-form1">
            <textarea value={answerText} onChange={(e) => setAnswerText(e.target.value)} placeholder="Tulis jawaban Anda di sini..." required></textarea>
            <button type="submit" className="submit-button">
              Kirim Jawaban
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuestions;
