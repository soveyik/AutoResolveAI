# AutoResolve - AI-Destekli Akıllı Müşteri Destek ve Biletleme Sistemi

A distributed support ticketing system built with Node.js, Python, PostgreSQL, and RabbitMQ. Features an asynchronous NLP pipeline to auto-categorize incoming tickets using HuggingFace.

---

## 🎨 Ekran Görüntüleri (UI Screenshots)

### 1. Destek Temsilcisi Paneli (AI NLP Duygu Analizi & Bilet Önceliklendirme Kuyruğu)
![Destek Temsilcisi Paneli](docs/images/admin_dashboard.png)

### 2. Müşteri Portalı (Yeni Bilet Oluşturma)
![Müşteri Portalı](docs/images/customer_dashboard.png)

### 3. Kullanıcı Giriş & Kayıt Ekranı
![Giriş Ekranı](docs/images/login_page.png)

---

## 🏗️ Sistem Mimarisi (System Architecture)

![Sistem Mimarisi](docs/images/system_architecture.png)

---

## ✨ Özellikler (Features)
- **NestJS Core API**: Handles CRUD operations and user authentication (JWT).
- **FastAPI AI Worker**: Consumes RabbitMQ events and processes ticket sentiment asynchronously.
- **Vanilla JS Client**: A lightweight, modern SPA client for demonstrating the event-driven architecture.

---

## 🚀 Kurulum (Installation)

### 1. Altyapı (Infrastructure)
PostgreSQL, Redis ve RabbitMQ servislerini başlatın:
```bash
docker-compose up -d
```

### 2. Core API (Node.js)
```bash
cd core-api
npm install
npm run start:dev
```
`http://localhost:3000` adresinde çalışır.

### 3. AI Worker (Python)
```bash
cd ai-service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 4. Kullanıcı Arayüzü (Web UI)
Tarayıcınızda `web-ui/index.html` dosyasını açın.

