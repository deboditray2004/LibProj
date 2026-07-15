# Library Management System

> An industry-grade, domain-driven Library Management System built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. Designed with a Neo-Brutalist aesthetic and robust God-mode administrative tools.

## Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Neo-Brutalist CSS tokens (`index.css`)
- **Animation:** Framer Motion
- **Icons:** Phosphor Icons
- **State Management & Routing:** React Context API, React Router DOM v6
- **Integrations:** Tawk.to Helpdesk

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT, bcrypt
- **Cloud Storage:** Cloudinary (for image uploads)
- **External APIs:** OpenLibrary API

---

## Core Features & Functionality

### Role-Based Access Control (RBAC)
- **Secure Authentication:** JWT-based stateless authentication with robust bcrypt password hashing.
- **Dual Portals:** Distinct, separated React routes and navigation hierarchies for `Students` and `Employees` ensuring zero accidental privilege escalation.

### Student Portal
- **Live Interactive Catalogue:** Browse the library's entire collection with real-time inventory tracking (`Available` vs `Total` stock).
- **Smart Availability:** If a book is completely checked out (0 copies available), the system automatically calculates and displays the exact "Expected Return Date" based on active transactions.
- **Personal Borrowing Dashboard:** Track current borrowed books, upcoming due dates, and past return history.
- **Automated Fine Tracking:** The system algorithmically calculates overdue fines based on elapsed days. Fines are securely "frozen" the moment a book is returned until the student pays.
- **Direct Support Helpdesk:** An integrated Tawk.to floating widget allowing direct, live chat with library staff. 

### Employee (Admin) Portal
- **God-Mode Inventory Management:** Add new books quickly by scraping metadata and cover images dynamically via the OpenLibrary API. Support for manual overrides.
- **Student Verification:** Review incoming student registrations. Approve/Reject workflows with Cloudinary-hosted Government ID and Avatar validations.
- **Book Request Pipeline:** Students can request books the library doesn't own. Employees manage these requests (Approve, Reject, Order Pending).
- **Physical Order Tracking:** When physical shipments arrive, employees mark "Order Received," which instantly updates local stock, fulfills the related student requests, and triggers automated email alerts to waiting students.
- **Transaction Overrides:** Manual authority to waive overdue fines, force-renew items, or manually log offline returns.
- **Shared Inbox Dashboard:** A dedicated Helpdesk button that instantly launches the Tawk.to employee dashboard to handle incoming student tickets in real-time.

### Automated Notification Engine
- **SMTP/Nodemailer Integration:** Automated email dispatches triggered by critical database events.
- **Alerts Include:** "Registration Approved", "Book Now Available", and "Overdue Warnings".

---

## Architecture Overview

The application follows a strictly separated architecture to ensure scalability and maintainability.

### Frontend Structure (Domain-Driven)
```text
frontend/src/
├── api/                  # Axios clients and interceptors
├── assets/images/        # Physical Assets
│   ├── books/            # Book cover images
│   ├── avatars/          # User profile pictures
│   └── branding/         # Logos and placeholder assets
├── components/           # Shared, global components
│   ├── layout/           # Navigation, sidebars, page wrappers
│   └── ui/               # Base UI elements (buttons, inputs)
├── context/              # Global state providers (AuthContext)
├── features/             # Domain-driven modules
│   ├── auth/             # Login, Registration, Password Reset pages
│   ├── employee/         # Admin dashboards, request management
│   ├── public/           # Landing page, public catalogue
│   └── student/          # Student portal, borrowing history
└── types/                # TypeScript interface definitions
```

### Backend Structure
```text
backend/src/
├── controllers/          # Request handlers and business logic
├── db/                   # Database connections and seed data
│   └── data/             # JSON mock data (books, students, employees)
├── middlewares/          # JWT auth, multer upload interceptors
├── models/               # Mongoose schemas
├── routes/               # Express routing endpoints
├── scripts/              # Administrative CLI tools
└── utils/                # Standardized API response classes, error handlers
```

---

## Local Environment Setup

### 1. Clone & Install
```bash
git clone <repository_url>
cd LibProj

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in the **backend**:
```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/library
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file in the **frontend**:
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_TAWKTO_PROPERTY_ID=your_property_id
```

### 3. Run Development Servers
Open two terminal instances:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## God-Mode Administrative CLI

The backend includes a powerful, terminal-based CLI script for raw database manipulation without needing to spin up the UI.

**Location:** `backend/src/scripts/adminSetup.js`

### Usage Instructions

Open a terminal in the `backend/` directory:

1. **Seed the Database (Safe/Append-Only):**
   Reads from `src/db/data/*.json` and gracefully inserts records, skipping duplicates.
   ```bash
   node src/scripts/adminSetup.js --seed
   ```

2. **Add an Entity manually:**
   ```bash
   node src/scripts/adminSetup.js --add student '{"name": "John", "rollNo": 123}'
   ```

3. **Remove an Entity manually:**
   ```bash
   node src/scripts/adminSetup.js --remove book 64b5f9...
   ```

4. **Flush Database (DANGER):**
   Wipes the *entire* database clean.
   ```bash
   node src/scripts/adminSetup.js --flush
   ```

---

## Physical Asset Management

All static physical assets (e.g., specific book covers that aren't fetched via the OpenLibrary API, or custom student avatars) should be managed directly in the `frontend/src/assets/images/` directory.

When referencing these assets in your JSON seed data, use root-relative paths that resolve from the `public/` directory during build, or import them directly in React if statically assigned. 

*Example Seed Data Reference:*
```json
{
  "globalBookId": "OL27329598M",
  "coverImg": "/assets/images/books/clean-code.jpg"
}
```

---

## Production Deployment

This project uses Vite to bundle the React SPA. 

### Netlify Deployment
If deploying to Netlify, you must create a `_redirects` file in the `frontend/public/` directory to handle React Router's client-side routing.

**`frontend/public/_redirects`**
```text
/*    /index.html   200
```

### Build Command
```bash
cd frontend
npm run build
```
This generates an optimized `dist/` folder ready for production static hosting.
