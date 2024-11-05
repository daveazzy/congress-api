import { env } from '@/env';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "mail.redepdimat.org", // Host do servidor de e-mail
  port: 465, // Porta para conexão segura
  secure: true, // Indica que a conexão deve ser segura (SSL)
  auth: {
    user: 'noreply@redepdimat.org', // Usuário de autenticação
    pass: env.MAIL_PASSWORD, // Senha armazenada em variáveis de ambiente
  },
  // logger: true, // Ativa log para depuração
  // debug: true, // Habilita logs de depuração adicionais
});

// Verificação de conexão
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro na verificação do transportador:', error);
  } else {
    console.log('Transportador está pronto para enviar e-mails.');
  }
});


