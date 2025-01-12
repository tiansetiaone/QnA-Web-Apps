const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  const { username, password, whatsapp } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, whatsapp, password) VALUES (?, ?, ?)';
    db.query(sql, [username, whatsapp, hashedPassword], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: 'User registered successfully!' });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Sertakan informasi user (termasuk role) dalam respons
    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        whatsapp: user.whatsapp,
        role: user.role, // Pastikan kolom 'role' tersedia di tabel
      },
    });
  });
};
