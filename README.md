# 🧴 Perfume E-commerce - Premium Perfume Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/your-repo)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/your-repo)
[![Java](https://img.shields.io/badge/Java-21-orange)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.0-brightgreen)](https://spring.io/projects/spring-boot)

**Perfume E-commerce** is a specialized e-commerce system for perfumes, built with a modern architecture focusing on user experience and integrated Artificial Intelligence (AI) for personalized product consultation.

---

## 🚀 Live Demo & Screenshots

*   **🌐 Demo Link (Video):** [Perfume E-commerce Demo](https://youtu.be/fYUBB8jRnL0?si=VR10dQ941PnJLnXY)
*   **📸 Screenshots:**
    *   *Homepage & Shop:* Elegant interface with product filtering by fragrance notes.
    *   *AI Assistant:* Intelligent chatbot for perfume consultation based on user preferences.
    *   *Admin Panel:* Intuitive system for inventory and order management.

*(Screenshots are being updated)*

---

## ✨ Key Features

### 🛍️ Storefront (Customers)
- **Advanced Search & Filter:** Search by name, brand, gender, and specifically filter by fragrance notes (Top, Heart, Base notes).
- **Cart & Checkout:** Optimized checkout process supporting multiple methods (COD, VNPay).
- **AI Assistant:** Chatbot using RAG (Retrieval-Augmented Generation) to provide the best product recommendations based on natural language queries.
- **User Account:** Personal profile management, multiple shipping addresses, and order history tracking.

### 🛡️ Admin Panel
- **Catalog Management:** Manage Brands, Notes, and Volumes.
- **Product Management:** Add new perfumes with multiple images (Cloudinary) and price configuration by volume.
- **Order Management:** Handle order workflows, update shipping status, and automatic invoice email notifications.
- **AI Management:** Synchronize data from the database to the Vector Database (Qdrant) to update the Assistant's knowledge base.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks, Context API
- **Networking:** Axios, React Router 6

### **Backend**
- **Framework:** Spring Boot 3.4 (Java 21)
- **Security:** Spring Security, JWT, OAuth2 (Google Login)
- **AI Integration:** Spring AI (Groq/Gemini), Qdrant (Vector DB)
- **Database:** MySQL, Spring Data JPA (Specifications)
- **Mapping & Utilities:** MapStruct, Lombok

### **Third-party Services**
- **Payment:** VNPay Gateway
- **Image Storage:** Cloudinary
- **Email:** Gmail SMTP (ThymeLeaf templates)

---

## ⚙️ Environment Variables

Create a `.env` file in the `/backend` directory based on the following template:

| Variable | Description | Required |
| :--- | :--- | :--- |
| **Database** | | |
| `MYSQL_URL` | MySQL connection URL (JDBC) | Yes |
| `MYSQL_DATABASE` | Database name | Yes |
| `MYSQL_USERNAME` | Database username | Yes |
| `MYSQL_PASSWORD` | Database password | Yes |
| **Security & Auth** | | |
| `JWT_SECRET` | Secret key for signing JWTs | Yes |
| `JWT_EXPIRATION` | JWT expiration time (ms) | Yes |
| `SSO_CLIENT_ID` | Google OAuth2 Client ID | Optional |
| `SSO_CLIENT_SECRET` | Google OAuth2 Client Secret | Optional |
| **Cloudinary** | | |
| `CLOUDINARY_NAME` | Cloud Name (Media Storage) | Yes |
| `CLOUDINARY_KEY` | API Key | Yes |
| `CLOUDINARY_SECRET" | API Secret | Yes |
| **Payment (VNPay)** | | |
| `VNPAY_TMN_CODE` | Terminal ID | Optional |
| `VNPAY_HASH_SECRET` | Secret hash for signature | Optional |
| `VNPAY_RETURN_URL` | URL to receive payment results | Optional |
| **AI (Groq/Gemini)** | | |
| `GROQ_API_KEY` | Groq API Key for LLM | Optional |
| **Mail Service** | | |
| `MAIL_USERNAME` | Sending email account (Gmail) | Yes |
| `MAIL_PASSWORD` | App Password | Yes |
| `MAIL_TOKEN` | Auth Token (if used) | Optional |
| **Frontend Integration**| | |
| `FRONTEND_URL` | Frontend application URL | Yes |

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/main/java/com/.../
│   │   ├── domain/          # Persistence (Entities, Repositories)
│   │   ├── modules/         # Business Logic (Service, Controller, DTO)
│   │   ├── common/          # Exceptions, Utilities, Wrappers
│   │   └── configs/         # Security, AI, Platform configs
│   └── database/            # Database initialization SQL scripts
├── frontend/
│   ├── src/
│   │   ├── features/        # Business features (Admin, Auth, Catalog...)
│   │   ├── components/      # Common UI components
│   │   ├── services/        # API Client calls
│   │   └── layouts/         # Page layouts
└── README.md
```

---

## 🛠️ Prerequisites & Installation

### **Requirements:**
- Java 21 & Maven 3.9+
- Node.js 18+
- MySQL 8.0+
- Qdrant (Docker recommended)

### **Installation Steps:**

1. **Clone Repo:**
   ```bash
   git clone https://github.com/your-username/perfume-store.git
   cd perfume-store
   ```

2. **Infrastructure Setup (Docker):**
   The project uses Docker Compose to manage MySQL and Qdrant (Vector Database).
   - Ensure you have configured the environment variables in `backend/.env`.
   - Run the following command in the `backend/` directory:
     ```bash
     cd backend
     docker-compose up -d
     ```
   *Note: MySQL runs on port `3307` and the Qdrant Dashboard on port `6333`.*

3. **Backend Setup:**
   - Ensure the Database is ready.
   - Run:
     ```bash
     mvn clean install
     mvn spring-boot:run
     ```

4. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---
*Thank you for your interest in the Perfume E-commerce project!*
