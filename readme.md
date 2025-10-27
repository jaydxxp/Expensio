# 💸 Smart Expense Tracker (MERN + TypeScript)

A full-stack Expense Tracker built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and TypeScript. It helps users manage their daily and recurring expenses, track spending habits, visualize insights, and use built-in AI and utility microservices — all in one dashboard.

## 🚀 Features

### 🧾 Expense Management
- Add new expenses with title, amount, category, date, and an optional recurring checkbox.
- Edit or delete existing expenses easily.
- Filter or search expenses by category or keywords.
- Preloaded category list (from a CSV) for a smooth dropdown without extra backend calls.
- View expense history with daily, weekly, and monthly summaries.

### 📊 Dashboard Analytics
- Total Expense Summary
- Top Category Spending
- Recurring Expense Overview
- Daily Spending Average
- Pie Chart (Category-wise breakdown)
- Line Chart (Monthly or weekly expense trend)
- Real-time updates on data changes

### 🤖 Microservices
This project integrates multiple microservices for extended functionality:
- **AI Assistant Microservice** — Ask natural questions like “What’s my highest spending category this month?” or “Suggest ways to save more.” The AI processes user expense data and responds with meaningful insights.
- **Currency Converter Microservice** — Real-time currency conversion using live exchange rates.
- **Calculator Microservice** — Quick access to a built-in calculator for expense or budget-related calculations.

### 💬 AI Assistant
- Uses a lightweight AI microservice to interpret queries.
- Allows asking natural financial questions and retrieves meaningful summaries or advice.
- Example queries:
  - “How much did I spend on food last week?”
  - “What are my recurring expenses this month?”
  - “What’s my average monthly spend?”
  - “Convert ₹10,000 to USD.”

### 💻 Tech Stack
- **Frontend:** React.js, TypeScript, TailwindCSS, Recharts
- **Backend:** Node.js, Express.js, TypeScript, Zod Validation, JWT Authentication
- **Database:** MongoDB (Atlas)
- **Microservices:** AI Assistant, Currency Converter, Calculator
- **Deployment:** Vercel (Frontend), Render (Backend)
- **Version Control:** Git + GitHub

### 🗂️ Project Structure
Backend:
src/
 ├─ models/         (Mongoose schemas)
 ├─ routes/         (Express routes)
 ├─ controllers/    (Core logic)
 ├─ validators/     (Zod validation schemas)
 ├─ middleware/     (Auth & error handling)
 ├─ microservices/  (AI, currency, calculator services)
 └─ config/         (Database connection & environment setup)

Frontend:
src/
 ├─ components/     (Charts, modals, forms, cards)
 ├─ pages/          (Dashboard, History, Auth)
 ├─ hooks/          (Custom hooks for API and state)
 ├─ services/       (API calls using Axios)
 ├─ context/        (Global context for auth & theme)
 └─ utils/          (Helpers like formatters & converters)

### ⚙️ API Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | /api/expenses/create | Create a new expense |
| GET | /api/expenses | Get all expenses for the logged-in user |
| PUT | /api/expenses/update/:id | Update an existing expense |
| DELETE | /api/expenses/delete/:id | Delete an expense |
| GET | /api/expenses/search?category=Food | Search or filter expenses by category |
| GET | /api/stats/dashboard | Fetch dashboard summary and analytics |
| GET | /api/tools/currency | Access the currency converter microservice |
| POST | /api/tools/calculator | Use the calculator microservice |
| POST | /api/tools/ai | Interact with the AI assistant microservice |

### 📈 Dashboard Insights
The dashboard dynamically displays:
- 💰 Total spending (monthly)
- 🥇 Top spending category
- 🔁 Recurring expenses count
- 📆 Daily spend average
- 📊 Category-wise Pie Chart
- 📉 Monthly trend Line Chart
- 🔍 Search and filter history

