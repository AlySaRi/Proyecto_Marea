import express from 'express';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendResetEmail } from '../utils/sendEmail.js';
import fs from 'fs';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const router = express.Router();

const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();
db.data ||= { users: [] };

// ----------------------
// FORMULARIO: Forgot Password
// ----------------------
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password'); // Handlebars
});

// ----------------------
// ENVIAR EMAIL
// ----------------------
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // MongoDB
  const user = await User.findOne({ email });

  // LowDB
  const userDB = db.data.users.find(u => u.email === email);

  if (!user && !userDB) return res.status(404).send("Usuario no encontrado");

  // Generar token
  const token = crypto.randomBytes(32).toString('hex');

  const expire = Date.now() + 1000 * 60 * 15; // 15 min

  // Guardar en MongoDB
  if (user) {
    user.resetPasswordToken = token;
    user.resetPasswordExpire = expire;
    await user.save();
  }

  // Guardar en LowDB
  if (userDB) {
    userDB.resetPasswordToken = token;
    userDB.resetPasswordExpire = expire;
    await db.write();
  }

  // Enviar correo
  await sendResetEmail(email, token);

  res.send("Correo de recuperación enviado!");
});


// FORMULARIO: Reset Password

router.get('/reset-password/:token', async (req, res) => {
  const token = req.params.token;

  // Buscar usuario en Mongo
  let user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });
  // Buscar usuario en LowDB si no está en Mongo
  if (!user) {
    user = db.data.users.find(u => u.resetPasswordToken === token && u.resetPasswordExpire > Date.now());
  }

  if (!user) return res.status(400).send("Token inválido o expirado");

  res.render('reset-password', { token }); // Handlebars
});


// POST: Cambiar Contraseña

router.post('/reset-password/:token', async (req, res) => {
  const { newPassword } = req.body;
  const token = req.params.token;

  // Mongo
  let user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });
  if (user) {
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return res.send("Contraseña cambiada correctamente (MongoDB)!");
  }

  // LowDB
  const userDB = db.data.users.find(u => u.resetPasswordToken === token && u.resetPasswordExpire > Date.now());
  if (userDB) {
    userDB.password = newPassword;
    userDB.resetPasswordToken = undefined;
    userDB.resetPasswordExpire = undefined;
    await db.write();
    return res.send("Contraseña cambiada correctamente (LowDB)!");
  }

  res.status(400).send("Token inválido o expirado");
});

export default router;