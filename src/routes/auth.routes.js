import express from 'express';
import crypto from 'crypto';
import User from '../models/User.js';
import { sendResetEmail } from '../utils/sendEmail.js';

const router = express.Router();

// LOGIN
router.get('/login', (req, res) => {
  res.render('login', { pageTitle: "Login - Marea" });
});

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('signup', { pageTitle: "Sign Up - Marea" });
});

// FORGOT PASSWORD FORM
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { pageTitle: "Forgot Password - Marea" });
});

// ENVIAR EMAIL DE RECUPERACIÓN
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("Usuario no encontrado");

  const token = crypto.randomBytes(32).toString('hex');
  const expire = Date.now() + 1000 * 60 * 15; // 15 min

  user.resetPasswordToken = token;
  user.resetPasswordExpire = expire;
  await user.save();

  await sendResetEmail(email, token);
  res.send("Correo de recuperación enviado!");
});

// RESET PASSWORD FORM
router.get('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ 
    resetPasswordToken: token, 
    resetPasswordExpire: { $gt: Date.now() } 
  });
  if (!user) return res.status(400).send("Token inválido o expirado");

  res.render('reset-password', { token, pageTitle: "Reset Password - Marea" });
});

// CAMBIAR CONTRASEÑA
router.post('/reset-password/:token', async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  const user = await User.findOne({ 
    resetPasswordToken: token, 
    resetPasswordExpire: { $gt: Date.now() } 
  });
  if (!user) return res.status(400).send("Token inválido o expirado");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.send("Contraseña cambiada correctamente!");
});

export default router;
