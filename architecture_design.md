# AutoResolve: AI-Destekli Akıllı Müşteri Destek ve Biletleme Sistemi

Harika bir hedef! Yeni mezun bir yazılım mühendisinin standart "To-Do" veya "Blog" uygulamalarından sıyrılıp dikkat çekebilmesi için sistemin **dağıtık (distributed)**, **asenkron (event-driven)** ve **yapay zeka destekli** olması gerekir. İşe alım yöneticileri (Hiring Managers), adayın sadece kod yazmasını değil, bir sistemi nasıl tasarladığını, darboğazları (bottleneck) nasıl öngördüğünü görmek ister.

Senin için **50k+ maaşlı iş kapılarını aralayacak**, modern şirketlerin (Trendyol, Getir, Insider veya yurt dışı remote şirketler) aradığı standartlarda **"AutoResolve: AI Destekli Akıllı Müşteri Destek ve Biletleme Sistemi"** projesini tasarladım.

---

### 1. Problem Tanımı
* **Çözülen Gerçek Problem:** Büyük e-ticaret veya SaaS şirketlerinin müşteri hizmetleri günde binlerce destek talebi (ticket) alır. Bu talepleri manuel olarak okumak, kategorize etmek, aciliyetini belirlemek ve ilgili departmana yönlendirmek inanılmaz bir zaman ve maliyet kaybıdır. Aynı zamanda sinirli bir müşterinin talebi gözden kaçabilir.
* **Hedef Kullanıcılar:** B2B şirketler (şirket içindeki Müşteri Temsilcileri ve Yöneticiler) ile şirket üzerinden destek talebi açan Son Kullanıcılar.

---

### 2. Sistem Mimarisi
Modern yapı gereği **Event-Driven Microservices (Olay Güdümlü Mikroservisler)** mimarisini kullanacağız.
* **API Gateway:** Tüm client isteklerini karşılar, Rate Limiting ve JWT doğrulamasını (hemen girişte) yapar. İçerideki servislere yönlendirir.
* **Core Service (Backend):** Müşteriler, temsilciler ve ticket verilerinin yönetildiği ana servis (CRUD işlemleri, yetkilendirmeler).
* **AI Service:** Yalnızca makine öğrenmesi ve yapay zeka operasyonlarından sorumlu bağımsız servis.

**Servisler Arası İletişim:**
* **Senkron (REST):** Client -> API Gateway -> Core Service iletişiminde (örn. kullanıcının kendi ticketlarını anında görüntülemesi).
* **Asenkron (Message Queue):** Core Service -> AI Service iletişiminde. Yeni bir ticket oluşturulduğunda API anında "Başarılı" yanıtı döner (200 OK). Arkadan **RabbitMQ / Kafka**'ya bir event fırlatılır (`ticket_created`). AI servisi bu message broker'ı dinler, ticket içeriğini alır, analiz eder ve sonucu tekrar message broker üzerinden (`ticket_analyzed`) Core Service'e göndererek veri tabanını günceller.

---

### 3. Teknoloji Seçimi
* **Backend Framework:** **Node.js (NestJS)** (TypeScript kullanılması, enterprise seviye bir yapıda olması ve Dependency Injection içermesi şirketlerin çok hoşuna gider. Alternatif olarak Java Spring Boot).
* **AI Microservice:** **Python (FastAPI)** (Çok hızlı, modern ve yapay zeka araçlarıyla %100 uyumlu).
* **Veritabanı:** **PostgreSQL** (Ticket, User ilişkileri, ACID compliance). İhtiyaç duyulursa loglar için MongoDB.
* **Cache:** **Redis** (Oturum yönetimi, sık erişilen genel veriler ve rate limiting için).
* **Message Broker:** **RabbitMQ** (Kurulumu Kafka'ya göre daha kolaydır ve bu business logic için biçilmiş kaftandır).
* **AI Araçları:** HuggingFace'in yetenekleri (örn: Türkçe NLP modelleri, duygu analizi için `Transformers` kütüphanesi) veya piyasa standardını göstermek için **OpenAI API**.

---

### 4. Özellikler
* **Authentication & Authorization:** Access Token (15 dk ömürlü) ve Refresh Token mekanizması (JWT). `Admin`, `Agent` ve `User` olarak 3 farklı rol (Role-based access control - RBAC).
* **Ölçeklenebilir API:** Pagination kuralları (Offset-based veya daha profesyonel olan Cursor-based pagination), filtreleme yapısı.
* **AI Destekli Özellikler (Core Business Value):**
  1. *Sentiment Analysis (Duygu Analizi):* AI, yazının agresif, nötr veya mutlu olduğunu anlar. Agresif ise ticket'ı anında **"High Priority" (Yüksek Öncelik)** olarak işaretler.
  2. *Auto-Categorization:* Metinden yola çıkarak "Kargo, İade, Teknik Destek, Fatura" gibi kategorileri atar.
  3. *Auto-Assignment:* Kategorisine göre uygun departmandaki en boş çalışana ticket'ı atar.
* **Logging & Monitoring:** Node.js tarafında Winston logger kullanımı. Hatalı endpointleri yakalayan global exception handler.
* **Rate Limiting & Caching:** Kötü niyetli scriptlerin saniyede yüzlerce API isteği atmasını engellemek için Redis üzerinden IP tabanlı rate limit (örn: saniyede max 5 istek).

---

### 5. DevOps
* **Docker Kurulumu:** Hem NestJS, hem FastAPI, hem de PostgreSQL/Redis/RabbitMQ için `docker-compose.yml` yazılacak. Projeyi indirenin ayağa kaldırması için sadece `docker-compose up -d` yazması yeterli olmalı (Bu en çok takdir edilen özelliktir).
* **CI/CD Pipeline:** Github Actions ile. Her push işleminde: Kodu formatlar (ESLint/Prettier), Unit testleri koşar, başarılıysa Docker imajını build eder.
* **Cloud Deployment:** AWS EC2 üzerine docker-compose ile deploy veya direkt Render / Railway gibi modern PaaS platformlarına entegrasyon. (Dosya/Resim yüklemeleri için AWS S3 kullanılmalı).
* **Ortam Değişkenleri:** Asla veritabanı şifreleri kod içine gömülmeyecek. `env.example` dosyası verilip, konfigürasyon paketi (@nestjs/config) ile `.env` üzerinden yönetilecek.

---

### 6. Kod Yapısı (NestJS - Modüler Mimari)
Domain-Driven Design (DDD) benzeri separation of concerns:
```text
src/
├── module/
│   ├── tickets/              # Ticket modülü
│   │   ├── controllers/      # Yalnızca HTTP İstek/Yanıtı (Routing)
│   │   ├── services/         # Tüm Business Logic buradadır
│   │   ├── repositories/     # TypeORM veya Prisma DB işlemleri
│   │   └── dto/              # Gelen isteklerin Validation (class-validator) sınıflandırılması
│   ├── auth/                 # Login/Register lojiği
│   └── users/
├── shared/
│   ├── common/               # Ortak Enumlar ve Tipler
│   ├── interceptors/         # Tüm dönüş verilerini standart JSON formatına sokan yapı
│   ├── guards/               # Yetki kontrolü (JWT/Roles)
│   └── exception-filters/    # Hatalar fırlatıldığında client'a standart format dönülmesi
└── main.ts                   # Uygulama başlangıcı
```

---

### 7. Ölçeklenebilirlik (10k+ Kullanıcıya Nasıl Dayanır?)
Bir mülakatta bu sorulduğunda şu cevapları vermelisin:
* **Stateless Servisler:** JWT kullandığımız için sunucular durumu (state) hafızasında tutmaz, böylece arkasına load balancer koyarak Core Service'i anında 3-5 tane çoğaltabiliriz.
* **Message Queue Asenkronizasyonu:** Tüm AI işlemleri ağır operasyonlardır. Bunları HTTP akışında (senkron) beklemiyoruz; sıraya (RabbitMQ) atıyoruz. Anlık 1.000 ticket açılsa bile sistem çökmez, sadece arkadaki analiz süreci biraz uzar ama kullanıcı hızlıca "İşleminiz alındı" yanıtını görür.
* **Veritabanı Yükü:** Çok okunan yapıları (örneğin sistemdeki metadataları vb.) Redis üzerinde tutarak PostgreSQL üzerindeki yük hafifletilir (Cache-aside strategy). Gerekirse okuma (Read Replica) ve yazma (Primary) veritabanları mimari olarak ikiye bölünebilir.

---

### 8. Güvenlik
* **Açıklar ve Önlemler:**
    * **CORS:** Sadece izin verilen Frontend URL'lerine erişim izni vermek.
    * **Helmet:** HTTP header güvenlik açıklarını kapatmak (tıklama hırsızlığı vs).
    * **SQL Injection & XSS:** Ham SQL yazmak yerine ORM (Örn: Prisma, TypeORM) kullanmak ve gelen inputları DTO'larda Regex ve Validator'larla sanitize etmek.
* **PII Data Anonymizer (Kritik Bonus):** AI servisine (özellikle OpenAI) veriyi gönderirken, regex kullanarak müşterinin kredi kartı, sosyal güvenlik numarası ya da açık adresini "yıldızlayarak (*)" gönderdiğini belirteceksin. Mülakatta bu çok büyük bir artı puandır.

---

### 9. Bonus (Startup Vizyonu ve Monetization)
Eğer mülakat bir Startup ile ise şunları proje hedeflerine ekleyebilirsin:
* **Geliştirme Fikri:** Sisteme Slack/Discord veya WhatsApp Business API entegrasyonu yazılabilir. Müşteri WhatsApp'tan yazar, sistem ticket oluşturur.
* **Monetization (Gelir Modeli):** Sistemin kendisi bir SaaS (Software as a Service) olarak tasarlanır (Multi-tenant mimari). Her şirket kendi workspace'ini açar. Standart paket "Sadece biletleme", Pro paket "Yapay zeka asistanı" (kullanım - token bazlı ücretlendirme) ile satılır.
