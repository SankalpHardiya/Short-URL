# 🔗 ShortURL – Node.js & MongoDB URL Shortener

A lightweight **URL shortener** built with **Node.js, Express, MongoDB, and JWT authentication**.  
Features include branded short links, personal dashboards, click analytics, and role-based access.

---

## ✨ Features
- 🚀 One-click short link generation  
- 👤 User dashboards (copy, delete, track clicks)  
- 📊 Analytics (total + timestamped clicks)  
- 🔐 Secure JWT `httpOnly` cookie authentication  
- 🛡 Role-based access: **Admin** vs **Normal users**  
- 🎨 Modern glassmorphism UI with smooth animations  

---

## 📚 Tech Stack
- **Backend:** Node.js, Express  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT + Cookies  

---

## ⚡ Quick Start
```bash
# 1. Clone & install
git clone https://github.com/your-user/shorturl.git
cd shorturl && npm install

# 2. Setup environment
cp .env.example .env
# add JWT_SECRET & MongoDB URI in .env file

# 3. Run development server
npm run dev

Now open 👉 http://localhost:8001
 to start shortening links!
