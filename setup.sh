#!/bin/bash
echo "🚀 Iniciando WhatPay Platform..."
echo "📦 Verificando dependencias..."

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Instala Docker primero."
    exit 1
fi

# Iniciar servicios
docker-compose up -d --build

echo "✅ WhatPay iniciado correctamente!"
echo "🌐 Backend API: http://localhost:3001"
echo "🗄️ Database: localhost:5432"
echo "📊 Redis: localhost:6379"