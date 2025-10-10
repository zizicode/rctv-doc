import React, { useState } from "react";
import "./ContactPage.scss";
import { FaInstagram, FaFacebook, FaYoutube, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

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
              <FaInstagram /> <Link to="https://www.instagram.com/rodolfo_cordones" target="_blank">Instagram</Link>
            </li>
            <li>
              <FaFacebook /> <Link to="https://www.facebook.com/RodolfoCordones?mibextid=ZbWKwL" target="_blank">Facebook</Link>
            </li>
            <li>
              <FaYoutube /> <Link to="https://www.youtube.com/@rodolfocordones" target="_blank">Youtube</Link>
            </li>
            <li>
              <FaEnvelope /> <Link to="mailto:info@rodolfocordones.com">info@rodolfocordones.com</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
