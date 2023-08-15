import { createTransport } from "nodemailer";
import { CONFIG_EMAIL } from "../config/config.js";

class EmailService {
  #clienteNodemailer;

  constructor(CONFIG_EMAIL) {
    this.#clienteNodemailer = createTransport(CONFIG_EMAIL);
  }

  async send(destinatario, mailOpt) {
    const mailOptions = {
      from: "Astros Indumentaria Deportiva",
      to: destinatario,
      subject: mailOpt.subject,
      text: mailOpt.mensaje,
      html: mailOpt.html,
      attachments: mailOpt.attachments,
    };
    try {
      const info = await this.#clienteNodemailer.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw error;
    }
  }
}

export const emailService = new EmailService(CONFIG_EMAIL);
