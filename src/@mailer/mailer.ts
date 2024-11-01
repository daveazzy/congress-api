import { env } from '@/env';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "mail.redepdimat.org", // Verifique se este é o host correto
  port: 465, // Use 465 se estiver usando SSL, ou 587 para STARTTLS
  secure: true, // true para SSL, false para STARTTLS (usando porta 587)
  auth: {
    user: 'noreply@redepdimat.org',
    pass: env.MAIL_PASSWORD, // Certifique-se de que a senha está correta
  },
  logger: true,
  debug: true, // Habilita logs de depuração para mais informações
});

// Verificação de conexão
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro na verificação do transportador:', error);
  } else {
    console.log('Transportador está pronto para enviar e-mails.');
  }
});
