# Library Management System

## 1. Brief Summary of the Project
An industry-grade, domain-driven Library Management System built with the MERN stack and TypeScript. It features distinct, secure portals for Students and Library Staff, automated fine tracking, real-time inventory management, email notifications, and a highly structured Neo-Brutalist user interface.

---

## 2. Capabilities & Interactions

### What you can do as a Student:
- **Live Interactive Catalogue:** Browse books and track real-time inventory.
- **Smart Availability:** View dynamically calculated "Expected Return Dates" for books currently out of stock.
- **Borrowing Dashboard:** Track active borrowed books, historical borrowing data, and upcoming due dates.
- **Fine Management:** Monitor algorithmically calculated overdue fines, which freeze upon book return until fully paid.
- **Book Requests:** Request new books that the library does not currently own.
- **Live Support:** Connect instantly to library staff via a floating Tawk.to live chat widget.

### What you can do as an Employee (Admin):
- **Inventory Management:** Add new books by dynamically scraping metadata and cover images via the OpenLibrary API.
- **Student Verification:** Review, approve, or reject student registrations by validating their Cloudinary-hosted Government IDs and Avatars.
- **Request Pipeline:** Review student book requests and formally log physical orders.
- **Order Fulfillment:** Mark physical shipments as "Received," which instantly updates local stock and resolves student waitlists.
- **Override Authority:** Manually waive overdue fines, force-renew items, and log offline physical returns.
- **Support Dashboard:** Handle incoming student chat tickets in real-time via the Tawk.to shared inbox.

### Student ↔ Employee Interactions:
- **Registration Workflow:** Students submit their IDs $\rightarrow$ Employees manually verify them $\rightarrow$ System automatically emails the student upon approval.
- **Waitlist Fulfillment:** Students request books $\rightarrow$ Employees place the order $\rightarrow$ When employees mark the order "Received," the system automatically emails all waiting students that the book is available.
- **Fine Resolution:** Students accrue dynamic fines $\rightarrow$ Employees have the authority to waive them or accept physical payment to clear them from the ledger.
- **Live Helpdesk:** Direct, real-time chat routing from the Student UI widget to the Employee dashboard.

---

## 3. Capabilities of the God Mode CLI
The CLI (`backend/src/scripts/adminSetup.js`) is an elevated administrative tool operating outside the UI. It provides direct, raw manipulation of the MongoDB database for super-admins:
- **Seed the Database:** Safely inserts dummy data (`--seed`) from local JSON files, gracefully skipping duplicates to establish a working environment instantly.
- **Add Entity:** Inject raw JSON directly into the database (`--add student '{"name": "John"}'`).
- **Remove Entity:** Delete documents by exact ObjectId (`--remove book <id>`).
- **Database Flush (DANGER):** Wipes the entire database clean in a single command (`--flush`).

---

## 4. Technicalities (Tech Stack & Services)

**Frontend:** 
- React 18, Vite, TypeScript
- Tailwind CSS with custom Neo-Brutalist CSS tokens
- Framer Motion (Animations)
- React Router DOM v6, React Context API

**Backend:**
- Node.js, Express.js
- MongoDB (via Mongoose)
- JWT (Stateless Authentication), bcrypt (Password Hashing)
- Multer (File Upload Interception), node-cron (Scheduled Tasks)

**External Services:**
- **OpenLibrary API:** Fetches book metadata and cover art dynamically.
- **Cloudinary:** Cloud storage for avatar and Government ID image uploads.
- **Nodemailer / SMTP:** Automated email dispatching engine for alerts and warnings.
- **Tawk.to:** Live chat widget and helpdesk portal integration.

---

## 5. Design Inspiration, Sources, & Icons
- **Aesthetic:** The application utilizes a **Neo-Brutalist** design system characterized by stark borders, flat pastel accents, and high-contrast brutalist shadows. It draws heavy inspiration from modern brutalist web trends (e.g., rustic.ai, karolbinkow.ski).
- **Typography:** *Plus Jakarta Sans* is used for clean, highly legible body text, paired with *Roboto Mono* for structured metadata, badges, and tables.
- **Icons & Assets:** All crisp UI symbology is powered entirely by **Phosphor Icons** (`@phosphor-icons/react`). Because the system utilizes lightweight SVG React components and Cloudinary for user images, it is completely devoid of heavy, locally stored physical assets.

---

## 6. How to Use the App & Seed Features

### Environment Setup
1. Clone the repository and install dependencies in both folders:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Create a `.env` file in the **backend**:
   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/library
   CORS_ORIGIN=http://localhost:5173
   ACCESS_TOKEN_SECRET=your_super_secret_key
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```
3. Create a `.env` file in the **frontend**:
   ```env
   VITE_API_URL=http://localhost:8000/api
   VITE_TAWKTO_PROPERTY_ID=your_property_id
   ```

### Running and Seeding
1. Start both servers:
   ```bash
   # Terminal 1
   cd backend && npm run dev
   # Terminal 2
   cd frontend && npm run dev
   ```
2. **Seeding the App:** To test the application immediately without manually registering users, open a terminal in the `backend/` directory and run:
   ```bash
   node src/scripts/adminSetup.js --seed
   ```
   This will populate your database with books, mock transactions, approved students, and an initial employee account (e.g., `empId: 1001`, `password: password123`), allowing you to log into the Employee portal right away.

---

## 7. File Structure
The application follows a strictly separated, domain-driven architecture:

```text
LibProj/
├── frontend/src/
│   ├── api/                  # Axios clients and interceptors
│   ├── components/           # Shared, global components (layout, ui)
│   ├── context/              # Global state providers (AuthContext)
│   ├── features/             # Domain-driven modules
│   │   ├── auth/             # Login, Registration, Password Reset
│   │   ├── employee/         # Admin dashboards, request management
│   │   ├── public/           # Landing page, public catalogue
│   │   └── student/          # Student portal, borrowing history
│   └── types/                # TypeScript interface definitions
│
└── backend/src/
    ├── controllers/          # Request handlers and core business logic
    ├── cron/                 # Scheduled tasks (overdue warnings)
    ├── db/                   # Database connections and mock JSON seed data
    ├── middlewares/          # JWT auth, Multer upload interceptors
    ├── models/               # Mongoose schemas
    ├── routes/               # Express routing endpoints
    ├── scripts/              # God-mode Administrative CLI tools
    └── utils/                # Cloudinary uploaders, mailer, and error handlers
```
