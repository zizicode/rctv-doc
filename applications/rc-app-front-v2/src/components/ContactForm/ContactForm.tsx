import { useState } from "react"
import { Mail, Send } from "lucide-react"
import './contactform.scss';

interface FormData {
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ email: "", subject: "", message: "" })
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      // Simular envío (puedes reemplazar esto con tu endpoint real)
      await new Promise((res) => setTimeout(res, 1500))
      alert("Mensaje enviado correctamente ✅")
      setForm({ email: "", subject: "", message: "" })
    } catch (error) {
      console.error(error)
      alert("Error al enviar el mensaje ❌")
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2><Mail className="inline-block mr-2" /> Contáctanos</h2>
        <p>Envíanos un mensaje, responderemos lo antes posible.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Asunto"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={sending}>
            {sending ? "Enviando..." : <>Enviar <Send className="ml-2" size={16} /></>}
          </button>
        </form>
      </div>
    </section>
  )
}
