import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (to, token) => {
  const resetLink = `http://localhost:3000/reset-password/${token}`;

  await resend.emails.send({
    from: "Marea App <onboarding@resend.dev>", 
    to,
    subject: "Restablecer contraseña",
    html: `
      <h2>Recuperar contraseña</h2>
      <p>Haz clic aquí para restablecer tu contraseña:</p>
      <a href="${resetLink}">Restablecer contraseña</a>
    `,
  });

  console.log(`Correo de recuperación enviado a ${to}`);
};
