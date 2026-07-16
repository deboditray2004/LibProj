# Library Management System

## 1. Brief Summary of the Project
An industry-grade, domain-driven Library Management System built with the MERN stack and TypeScript. It features distinct, secure portals for Students and Library Staff, automated fine tracking, real-time inventory management, email notifications, and a highly structured Neo-Brutalist user interface.

---

## 2. System Control Flow & Edge Case Handling
The application abandons traditional, static feature lists in favor of interconnected, state-driven domain workflows between Students and the Library Staff.

- **The Registration Pipeline:** When a student registers, their account is placed in a pending state. They cannot log in immediately. Their uploaded Government ID and Avatar are beamed to Cloudinary, and the URL references are stored. An employee must manually review and `approve` the registration in their dashboard. 
  - *Edge Case Handled:* If a student tries to register with a duplicate Roll Number, the MongoDB uniqueness constraint triggers a clean `409 Conflict` error on the frontend, gracefully prompting the user to log in instead of crashing the server. Upon employee approval, the system fires an automated Nodemailer SMTP email welcoming the student.

- **The Waitlist & Order Fulfillment Loop:** If a student cannot find a book, they issue a formal "Book Request". This places a ticket in the Employee dashboard. The employee can then order the physical copies.
  - *Edge Case Handled:* When the shipment arrives, the employee marks the order as "Received." The backend processes a unified MongoDB Transaction (`sessionWrapper`) that strictly atomically updates the library stock, deletes the pending requests, and iterates through every single waiting student to dispatch a "Book Now Available" email. If the email dispatch fails for one student, it does not rollback the stock update, isolating non-critical failures.

- **Dynamic Fine Algorithm & Waivers:** Fines are not statically saved every day via a cron job (which is prone to failure). Instead, they are calculated completely dynamically upon request (`activeFine`). 
  - *Edge Case Handled:* A student cannot pay an active fine while they still hold the book, as the fine is continuously growing. Only when the physical book is returned does the active fine crystallize into a `frozenFine` on the transaction record. From there, the student can pay it off, or an Employee can utilize their elevated RBAC override to manually waive the fine (zeroing the ledger).

- **Automated Overdue Enforcement:** A background `node-cron` daemon runs at 09:00 AM daily. It queries the database for all active transactions (no return date) where the `dueDate` has elapsed, automatically blasting "Overdue Warning" emails to offenders. 
  - *Edge Case Handled:* The system gracefully checks for missing emails or malformed student references before dispatching to prevent cron-job crashes.

---

## 3. Standout Features for Engineering Teams
This project was engineered to demonstrate senior-level architectural foresight, moving beyond standard CRUD applications to showcase robust, production-ready design decisions:

- **Strict Role-Based Access Control (RBAC):** There is absolute segregation between the Student and Employee scopes. Employee API routes are heavily protected by `verifyEmployee` middlewares. Stress tests confirm that injecting a valid Student JWT into an Employee route yields a hard `401 Unauthorized`.
- **Stateless & Scalable Auth:** Authentication relies exclusively on HTTP-only JWTs and bcrypt hashing. No sessions are stored in the database, reducing memory overhead and allowing the Node.js instances to scale horizontally.
- **Defensive API Design:** The backend is fortified with `express-rate-limit` (capping bursts to prevent brute force), `multer` with strict `fileFilter` extensions (rejecting masked `.exe` payloads disguised as images), and global error handling interceptors that guarantee consistent JSON API responses.
- **Neo-Brutalist UX:** The frontend breaks away from generic component libraries (like Bootstrap/Material). It features a bespoke Neo-Brutalist design system using custom CSS variables, raw borders, high-contrast states, and fluid Framer Motion micro-interactions, ensuring a premium, highly engaging user experience.
- **The "God Mode" CLI:** A custom terminal-based script (`adminSetup.js`) allows developers to bypass the UI entirely to execute raw database seeding, entity injections, and destructive flushes—proving an understanding of DX (Developer Experience) and staging environment setups.

---

## 4. Capabilities of the God Mode CLI
The CLI (`backend/src/scripts/adminSetup.js`) is an elevated administrative tool operating outside the UI. It provides direct, raw manipulation of the MongoDB database for super-admins:
- **Seed the Database:** Safely inserts dummy data (`--seed`) from local JSON files, gracefully skipping duplicates to establish a working environment instantly.
- **Add Entity:** Inject raw JSON directly into the database (`--add student '{"name": "John"}'`).
- **Remove Entity:** Delete documents by exact ObjectId (`--remove book <id>`).
- **Database Flush (DANGER):** Wipes the entire database clean in a single command (`--flush`).

---

## 5. Technicalities (Tech Stack & Services)

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
- **Google Books API:** Fetches book metadata and cover art dynamically.
- **Cloudinary:** Cloud storage for avatar and Government ID image uploads.
- **Nodemailer / SMTP:** Automated email dispatching engine for alerts and warnings.
- **Tawk.to:** Live chat widget and helpdesk portal integration.

---

## 6. Design Inspiration, Sources, & Icons
- **Aesthetic:** The application utilizes a **Neo-Brutalist** design system characterized by stark borders, flat pastel accents, and high-contrast brutalist shadows. It draws heavy inspiration from modern brutalist web trends (e.g., rustic.ai, karolbinkow.ski).
- **Typography:** *Plus Jakarta Sans* is used for clean, highly legible body text, paired with *Roboto Mono* for structured metadata, badges, and tables.
- **Icons & Assets:** All crisp UI symbology is powered entirely by **Phosphor Icons** (`@phosphor-icons/react`). Because the system utilizes lightweight SVG React components and Cloudinary for user images, it is completely devoid of heavy, locally stored physical assets.

---

## 7. How to Use the App & Seed Features

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

## 8. File Structure
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
