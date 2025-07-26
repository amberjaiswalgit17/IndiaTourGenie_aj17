# 🇮🇳 IndiaTourGenie

A smart, AI-powered trip planner to explore India effortlessly!

---

## 🚀 Overview

**IndiaTourGenie** is your personal travel assistant—leveraging the power of **Cohere's AI**—designed to craft rich, personalized itineraries for any Indian destination. Whether you're a spontaneous backpacker or a meticulous planner, IndiaTourGenie helps you discover the best experiences across India in moments.

---

## 🌟 Features

- 🔮 **AI Itinerary Generator**: Get instant, day-wise, personalized itineraries—just enter your destination, trip duration, and interests.<br>
- ⚡ **Live Preview**: Preview detailed itineraries with sleek, animated transitions.<br>
- 🧾 **Download as PDF**: Export your travel plan with one click using `html2pdf`.<br>
- 📦 **Local Trip Storage**: Easily manage all your planned trips right from your browser.<br>
- 💡 **Smart Reference Code**: Unique reference code auto-generated for every trip plan.<br>
- 🔐 **Secure API Keys**: All credentials kept securely in `.env` and never committed.<br>
- 🌐 **Full Cloud Deployment**: Ultra-fast frontend on Netlify, reliable backend on Render.<br>

---

## 🧱 Tech Stack

| Area      | Tech Stack                                 |
|-----------|---------------------------------------------|
| Frontend  | HTML, CSS, JavaScript (Vanilla), Netlify   |
| Backend   | Node.js, Express, Cohere API, Render       |
| Styling   | Custom CSS, animations, responsive design  |
| Utilities | Git, GitHub, html2pdf, .env, REST APIs     |

---

## 💻 Installation & Local Setup

### Requirements

- Node.js installed
- A [Cohere API key](https://cohere.ai/)

### 1. Clone the Repo <br>
git clone https://github.com/amberjaiswalgit17/IndiaTourGenie_aj17 <br>
cd IndiaTourGenie_aj17

### 2. Backend Setup <br>
cd server<br>
npm install

### 3. Create a .env file inside the server directory:<br>
COHERE_API_KEY=your_cohere_api_key

### 4. Start the backend server:<br>
node server.js

### 🚀 Live Demo
### Explore IndiaTourGenie live:<br>
🌐 https://indiatour-genie-ui.netlify.app/

### 📝 Usage
Open IndiaTourGenie (see live link above).<br>
Enter your destination, trip duration, and travel interests.<br>
Instantly view your personalized, AI-powered itinerary.<br>
Adjust preferences, preview your trip, and export your plan as a PDF.<br>
Access and manage your previous itineraries with unique reference codes.<br>

### 🛡️ Security <br>
All API keys are stored in environment variables and never exposed in the repo.<br>
Always keep .env added to your .gitignore.<br>









