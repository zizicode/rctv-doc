import React, { useState } from "react";
import "./ContactPage.scss";
import { FaInstagram, FaFacebook, FaYoutube, FaEnvelope } from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula envío de correo (puedes conectar con tu backend o email service)
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <div className="ContactPage">
      <div className="contact-header">
        <h1>Contacto</h1>
        <p>¿Tienes alguna consulta, propuesta o colaboración? Escríbenos o síguenos en redes.</p>
      </div>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </label>

          <label>
            Mensaje
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
            />
          </label>

          <button type="submit" className="btn-primary">
            Enviar mensaje
          </button>

          {status === "success" && (
            <p className="success-msg">✅ Tu mensaje fue enviado con éxito.</p>
          )}
        </form>

        <div className="contact-info">
          <h2>También puedes encontrarnos en</h2>
          <ul>
            <li>
              <FaInstagram /> <a href="https://instagram.com/" target="_blank">Instagram</a>
            </li>
            <li>
              <FaFacebook /> <a href="https://facebook.com/" target="_blank">Facebook</a>
            </li>
            <li>
              <FaYoutube /> <a href="https://youtube.com/" target="_blank">Youtube</a>
            </li>
            <li>
              <FaEnvelope /> <a href="mailto:info@rodolfocordones.com">info@rodolfocordones.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
