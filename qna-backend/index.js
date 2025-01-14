const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const i18n = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const { sendMessageToUser } = require('./whatsapp/wabot'); // Import fungsi kirim pesan

// Routes
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const i18nRoutes = require('./routes/i18nRoutes');
const translateRoutes = require('./routes/translateRoutes');

const app = express();



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // Untuk menangani URL-encoded payload


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Middleware to log request method and URL
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Configure i18n for internationalization
i18n.use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      fallbackLng: 'en', // Default language
      backend: {
        loadPath: './locales/{{lng}}.json', // Path to translation files
      },
    });

app.use(middleware.handle(i18n));

// Internationalization routes
app.use('/api/i18n', i18nRoutes);

// Translation routes
app.use('/api/translate', translateRoutes);

// CORS options for frontend
const corsOptions = {
  origin: 'http://localhost:3000', // URL of your frontend application
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Endpoint untuk admin membalas pesan
app.post('/admin/reply', (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).send({ success: false, message: 'Nomor tujuan dan pesan wajib diisi.' });
  }

  try {
    sendMessageToUser(to, message);
    res.status(200).send({ success: true, message: 'Pesan berhasil dikirim.' });
  } catch (error) {
    console.error('Gagal mengirim pesan:', error.message);
    res.status(500).send({ success: false, message: 'Gagal mengirim pesan.' });
  }
});

