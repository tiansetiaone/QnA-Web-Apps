const qrcode = require('qrcode-terminal');
const db = require('../config/db'); // Konfigurasi database
const dbValidation = require('../config/dbValidation'); // Import konfigurasi khusus
const { Client, LocalAuth } = require('whatsapp-web.js');


// Inisialisasi WhatsApp Client
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "client-one", // Unik identifier
  }),
});

// Menampilkan QR code
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Log jika berhasil terautentikasi
client.on('authenticated', () => {
  console.log('Bot berhasil terautentikasi.');
});

// Log jika bot siap digunakan
client.on('ready', () => {
  console.log('Bot siap digunakan!');
});

// Fungsi untuk validasi user di database
const validateUser = async (userId) => {
  try {
    const query = 'SELECT id FROM users WHERE id = ?';
    const [rows] = await dbValidation.execute(query, [userId]); // menggunakan dbValidation
    return rows.length > 0;
  } catch (err) {
    console.error('Error saat memvalidasi user_id:', err.message);
    return false;
  }
};

// Fungsi untuk menyimpan pertanyaan ke tabel `questions`
const saveQuestion = async (userId, categoryId, questionText, groupId) => {
  try {
    console.log('Menyimpan pertanyaan:', { userId, categoryId, questionText, groupId });
    const query = `
      INSERT INTO questions (user_id, category_id, question_text, status, group_id, created_at, updated_at)
      VALUES (?, ?, ?, 'pending', ?, NOW(), NOW())
    `;
    await db.execute(query, [userId, categoryId, questionText, groupId]);
    console.log('Pertanyaan berhasil disimpan ke database!');
  } catch (err) {
    console.error('Gagal menyimpan pertanyaan ke database:', err.message);
  }
};

// Fungsi untuk memproses pesan
client.on('message', async (message) => {
  try {
    const chatId = message.chat?.id || null; // Cegah error jika message.chat.id undefined
    console.log(`Pesan masuk dari ${message.from} (grup: ${chatId || 'Personal Chat'}): ${message.body}`);

    const prefix = "!question";
    const mentionRegex = /@(\S+)/g; // Regex untuk mendeteksi mention manual
    const botId = client.info.wid._serialized; // ID lengkap bot
    const botNumber = client.info.wid.user; // Nomor bot tanpa domain

    // Cek apakah pesan berasal dari grup
    if (message.isGroupMsg) {
      const mentions = message.mentionedIds || [];
      console.log(`Mention ditemukan: ${mentions}`);
      console.log(`Nomor bot: ${botNumber}`);

      // Cek mention manual berdasarkan format seperti @Bpk.Fickar
      const manualMention = message.body.match(mentionRegex)?.some((mention) => {
        return mention.includes(botNumber);
      });

      // Cek apakah bot disebutkan melalui mention API atau manual
      const isBotMentioned = mentions.some((id) => id === botId) || manualMention;

      if (isBotMentioned) {
        const content = message.body.replace(mentionRegex, '').trim(); // Hapus mention/tag
        if (content.toLowerCase().startsWith(prefix)) {
          await processQuestion(message, content, true); // Proses pertanyaan dalam grup
        }
      }

      // Jika hanya menggunakan prefix tanpa mention
      if (message.body.toLowerCase().startsWith(prefix)) {
        await processQuestion(message, message.body, true);
      }
    } else {
      // Proses pesan di luar grup (personal chat)
      if (message.body.toLowerCase().startsWith(prefix)) {
        await processQuestion(message, message.body, false);
      }
    }
  } catch (err) {
    console.error('Terjadi kesalahan saat memproses pesan:', err);
  }
});

// Fungsi untuk memproses pertanyaan
const processQuestion = async (message, content, isGroup) => {
  try {
    const args = content.slice("!question".length).trim().split(" ");
    const userId = parseInt(args[0], 10);
    const questionText = args.slice(1).join(" ");
    const categoryId = null; // Default nilai kategori adalah null

    // Ambil group_id jika pesan berasal dari grup
    const groupId = isGroup ? message.chat?.id || null : null;

    // Validasi input
    if (!userId || !questionText) {
      await message.reply(
        `Format salah! Gunakan:\n- !question [token bot] [pertanyaan]\n\nContoh:\n!question 12345 Apa jadwal pengiriman hari ini?`
      );
      return;
    }

    // Validasi user_id
    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      await message.reply(`Token Bot ${userId} tidak valid! Pastikan Anda memasukkan Token Bot yang benar atau lakukan registrasi akun di situs QnA APP`);
      return;
    }

    // Simpan pertanyaan jika user_id valid
    await saveQuestion(userId, categoryId, questionText, groupId);
    const replyMessage = isGroup
      ? `Pertanyaan Anda berhasil disimpan dalam grup ${message.chat?.name || 'tidak diketahui'}! Admin akan segera menindaklanjuti.`
      : `Pertanyaan Anda berhasil disimpan! Terima kasih telah menghubungi kami.`;
    await message.reply(replyMessage);
  } catch (err) {
    console.error('Error saat memproses pertanyaan:', err);
    await message.reply('Terjadi kesalahan saat memproses pertanyaan Anda. Silakan coba lagi nanti.');
  }
};

// Fungsi untuk memformat nomor telepon
const formatPhoneNumber = (phone) => {
  const cleanedPhone = phone.replace(/[^0-9]/g, '');
  if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
    throw new Error(`Nomor telepon tidak valid: ${cleanedPhone}`);
  }
  return `${cleanedPhone}@c.us`;
};

// Fungsi untuk mengirim pesan ke pengguna
const sendMessageToUser = async (to, message) => {
  try {
    const formattedPhone = formatPhoneNumber(to);
    console.log(`Mengirim pesan ke ${formattedPhone}: ${message}`);
    await client.sendMessage(formattedPhone, message);
    console.log(`Pesan berhasil dikirim ke ${formattedPhone}`);
  } catch (err) {
    console.error(`Gagal mengirim pesan ke ${to}:`, err.message);
    throw err;
  }
};

// Inisialisasi client
client.initialize();

module.exports = { sendMessageToUser };
