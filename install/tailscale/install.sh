#!/bin/bash
# Script de instalación y conexión automática de Tailscale en Ubuntu Server

# --- CONFIGURACIÓN ---
TAILSCALE_AUTH_KEY="tskey-auth-kXt2GTYri721CNTRL-KeTfzL5wD853AQuj2fzW85V41sXZxW6j3"  # <-- reemplaza con tu key

# --- INSTALACIÓN ---
echo "📦 Instalando Tailscale..."
curl -fsSL https://tailscale.com/install.sh | sh

# --- HABILITAR SERVICIO ---
echo "⚙️ Habilitando servicio..."
sudo systemctl enable --now tailscaled

# --- CONEXIÓN AUTOMÁTICA ---
echo "🔐 Conectando con Tailscale..."
sudo tailscale up --authkey=${TAILSCALE_AUTH_KEY} --hostname=$(hostname) --ssh

# --- VERIFICACIÓN ---
echo "✅ Estado de conexión:"
sudo tailscale status

echo "🚀 Instalación y conexión completa. Este servidor se reconectará automáticamente al iniciar."
