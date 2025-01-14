const Answer = require("../models/Answer");
const Question = require("../models/Question");
const db = require("../config/db");
const { sendMessageToUser } = require("../whatsapp/wabot");

// Fungsi untuk menambahkan jawaban
exports.addAnswer = (req, res) => {
  const { questionId, answerText, adminId } = req.body;
  console.log("Data diterima di backend:", { questionId, answerText, adminId });

  // Validasi input
  if (!questionId || !answerText || !adminId) {
    return res.status(400).json({ error: "Semua field harus diisi." });
  }

  // Mulai transaksi
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error saat mendapatkan koneksi:", err);
      return res.status(500).json({ error: "Gagal mendapatkan koneksi database" });
    }

    connection.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error("Error saat memulai transaksi:", transactionErr);
        connection.release();
        return res.status(500).json({ error: "Gagal memulai transaksi" });
      }

      // Tambahkan jawaban ke tabel answers
      const insertAnswerQuery = `
        INSERT INTO answers (question_id, answer_text, admin_id, created_at, updated_at) 
        VALUES (?, ?, ?, NOW(), NOW())
      `;
      connection.query(insertAnswerQuery, [questionId, answerText, adminId], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error saat menambahkan jawaban:", insertErr);
          return connection.rollback(() => {
            connection.release();
            res.status(500).json({ error: "Gagal menambahkan jawaban" });
          });
        }

        // Perbarui status pertanyaan menjadi 'answered'
        const updateQuestionStatusQuery = `
          UPDATE questions SET status = ? WHERE id = ?
        `;
        connection.query(updateQuestionStatusQuery, ["answered", questionId], (updateErr) => {
          if (updateErr) {
            console.error("Error saat memperbarui status pertanyaan:", updateErr);
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({ error: "Gagal memperbarui status pertanyaan" });
            });
          }

          // Kirim notifikasi ke WhatsApp user
          const getUserAndQuestionQuery = `
            SELECT u.whatsapp_number, u.username, q.question_text, q.group_id
            FROM questions q
            JOIN users u ON q.user_id = u.id
            WHERE q.id = ?
          `;
          connection.query(getUserAndQuestionQuery, [questionId], (userErr, userResult) => {
            if (userErr || userResult.length === 0) {
              console.error("Gagal mendapatkan data pengguna dan pertanyaan:", userErr);
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({ error: "Gagal mendapatkan data pengguna dan pertanyaan" });
              });
            }

            const { whatsapp_number: userPhoneNumber, username, question_text: questionText, group_id: groupId } = userResult[0];
            let groupInfo = "";
            if (groupId) {
              groupInfo = `Pertanyaan berasal dari group: ${groupId}`;
            }

            const message = `
Halo ${username},

Pertanyaan Anda:
"${questionText}"

Jawaban dari admin:
"${answerText}"

${groupInfo}

Terima kasih atas pertanyaan Anda!
            `.trim();

            sendMessageToUser(userPhoneNumber, message)
              .then(() => {
                console.log(`Notifikasi berhasil dikirim ke WhatsApp: ${userPhoneNumber}`);
                connection.commit((commitErr) => {
                  if (commitErr) {
                    console.error("Error saat melakukan commit:", commitErr);
                    return connection.rollback(() => {
                      connection.release();
                      res.status(500).json({ error: "Gagal menyelesaikan transaksi" });
                    });
                  }

                  connection.release();
                  res.status(201).json({
                    message: "Jawaban berhasil ditambahkan dan notifikasi dikirim ke pengguna.",
                    answerId: insertResult.insertId,
                  });
                });
              })
              .catch((error) => {
                console.error("Gagal mengirim pesan WhatsApp:", {
                  message: error.message,
                  stack: error.stack,
                  data: { userPhoneNumber, message },
                });

                connection.rollback(() => {
                  connection.release();
                  res.status(500).json({
                    error: "Gagal mengirim notifikasi WhatsApp",
                    details: error.message,
                  });
                });
              });
          });
        });
      });
    });
  });
};

// Fungsi untuk mendapatkan jawaban berdasarkan questionId
exports.getAnswers = (req, res) => {
  const { questionId } = req.params;
  console.log("Question ID:", questionId);

  Question.getAnswersByQuestionId(questionId, (err, answers) => {
    if (err) {
      return res.status(500).json({ error: "Terjadi kesalahan saat mengambil jawaban" });
    }

    if (answers.error) {
      return res.status(404).json(answers); // Tampilkan error yang berasal dari fungsi
    }

    res.status(200).json(answers); // Jawaban ditemukan
  });
};
