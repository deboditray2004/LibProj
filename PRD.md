# Library Management System - Product Requirements Document (PRD)

**Project Overview:** A full-stack, enterprise-grade Library Management System designed to handle complex business logic. The system strictly separates users into two independent roles: **Students** and **Library Management (Employees)**, and features robust concurrency control, automated penalty calculations, an intelligent digital inventory, and a secure password reset pipeline.


---

## 1. Student Portal Features

### 1.1 Authentication & Onboarding
- **Registration Pipeline:** Students register by submitting their personal and academic details, along with their Government ID and photo (uploaded to Cloudinary).
- **Approval Workflow:** All new registrations are placed in a `Pending` queue. Once vetted and approved by Management, the system automatically generates a unique Library Card Number and fires a welcome email.
- **Secure Login:** Students log into their personalized dashboard using their Library Card Number and password.
- **Logout:** Clears the authenticated `httpOnly` session cookie server-side.
- **Forgot Password:** A secure, token-based password reset flow. The system generates a cryptographically secure one-time token (SHA-256 hashed at rest in the database), emails a reset link to the user's registered address with a **15-minute expiry window**. Applies to both Student and Employee accounts.

### 1.2 Dashboard & Profile Management
- **Profile View:** Students can view their full registered profile details.
- **Profile Update Requests:** Students can request edits to their Name, DOB, Address, Email, Department, and Roll Number. Changes remain in a `Pending` state until authorized by Management.
- **Active Borrowings:** A real-time view of currently borrowed books, issue dates, and exact due dates.
- **Transaction History:** Full paginated history of all past borrow, return, and renewal events.
- **Financial Tracking:** A dynamic fine-calculation engine that displays exact overdue penalties in real-time.
- **Fine Payment:** Students can settle their outstanding fine balance directly from the dashboard.
- **Book Renewal:** Students can renew an active borrowing directly from their dashboard.
- **Borrowing Constraints (Business Logic):**
  - **Renewal Limits:** Students can renew a borrowed book a maximum of **2 consecutive times**. After the second renewal, physical return is mandatory.

### 1.3 Digital Catalogue
- **Guest Access:** Non-authenticated users can freely browse the public catalogue without logging in.
- **Search & Filters:** Real-time search by Title or Author, with category-based filtering.
- **Inventory & Availability Engine:**
  - Displays real-time "Copies Left" for every book.
  - **Predictive Availability:** If copies = 0, the system calculates and displays the exact date the next copy is expected to become available.
- **Automated Book Request System:** If a book is missing or out of stock, students can submit a formal request by ISBN. Requests are aggregated and sent to the Management purchasing pipeline.

### 1.4 Support & Communication
- **In-App Chat Bubble:** A third-party Helpdesk widget (e.g., Tawk.to or Crisp) is embedded via a frontend `<script>` tag. Students initiate conversations directly from the library portal.
- **Cross-Platform Replies:** If a student leaves the site, the system emails the employee's reply to the student's registered address. The student can reply from their personal email app, and the message routes back to the employee's dashboard.

---

## 2. Library Management (Admin/Employee) Features

### 2.1 Access
- **Secure Login:** Employees log in using pre-assigned Employee IDs and passwords. No public registration; accounts are provisioned internally.
- **Logout:** Clears the authenticated session cookie server-side.
- **Forgot Password:** Shares the same secure reset pipeline as students.

### 2.2 Administrative Queues (Student Management)
- **Pending Student Approvals:** Review submitted Govt IDs and profile photos. Approve (generates Library Card No + sends welcome email) or Reject (sends rejection email with mandatory reason).
- **Pending Profile Edit Requests:** Review requested field changes from existing students. Approve (applies changes to live profile) or Reject (with a reason message).

### 2.3 Desk Operations (Transactions)
- **Issue Book (Borrow):** Employee processes a borrow using the student's Card No and book's ISBN. Protected by ACID-compliant concurrency control.
- **Return Book:** Employee processes a return. The system automatically calculates and freezes any accrued overdue fine to the student's balance.

### 2.4 Inventory & Order Management
- **Student Request Pipeline:** View all student book requests aggregated by ISBN and sorted by popularity.
- **Automated Ordering (Google Books API):** When placing an order, the backend queries the Google Books API to validate the ISBN. If found, an `Order` document is created with the book's metadata cached. If not found, the request is invalidated automatically.
- **Manual Orders:** Employees can search the Google Books API by ISBN and place orders directly, independent of student requests.
- **Receive Order:** When a physical delivery arrives, the employee marks the order as received. The system automatically:
  - Creates a new Book entry in inventory OR updates stock counts of an existing book.
  - Marks all related student `BookRequests` as "Fulfilled."
  - Sends automated "Now Available" notifications to waiting students.
- **Reject Book Request:** Employees can reject individual student book requests with a reason.

### 2.5 Support (Helpdesk Dashboard)
- **External Helpdesk Portal:** Employees manage all student support tickets from the Helpdesk provider's dedicated web dashboard (e.g., Tawk.to). Tickets are automatically assigned and locked to prevent simultaneous replies from two employees.
- **No Backend Required:** Handled entirely by the third-party service; zero Node.js endpoints or MongoDB collections needed.

---

## 3. System Architecture & Security

### 3.1 Data Validation (Zod)
- All incoming HTTP payloads are strictly validated against Zod schemas via a centralized `validate()` middleware. Controllers only execute on 100% valid data, with field-level error messages on failure.

### 3.2 Concurrency & ACID Compliance
- **Optimistic Concurrency Control (OCC):** `mongoose-update-if-current` plugin prevents data race conditions during high-volume simultaneous operations.
- **Atomic Transactions:** Critical multi-document operations (e.g., borrow: decrement book stock + create transaction record) are wrapped in a `sessionWrapper` with full rollback on failure.

### 3.3 Security
- **Role-Based JWT Auth:** `verifyStudent` and `verifyEmployee` middlewares validate encrypted `httpOnly` cookies on every protected route.
- **Password Hashing:** All passwords are stored as `bcrypt` hashes (salt rounds: 10). Plaintext is never stored or retrievable.
- **Cryptographic Reset Tokens:** Password reset tokens use `crypto.randomBytes(32)` and are stored as SHA-256 hashes in the database.
- **Global Error Handler:** All errors are formatted into a standardized JSON response `{ statusCode, message, success, errors }`, preventing raw stack trace leakage.

### 3.4 External Service Integrations

| Service | Purpose | Status |
|---|---|---|
| **MongoDB Atlas** | Primary database with replica set for transactions | ✅ Connected |
| **Cloudinary** | Student photo & Govt ID file storage | ✅ Connected |
| **Google Books API** | Book metadata fetching & order validation | ✅ Connected |
| **Nodemailer (Gmail SMTP)** | Transactional emails (approvals, rejects, password reset) | ✅ Connected |
| **Helpdesk (Tawk.to/Crisp)** | Student support chat widget | ⏳ Pending Frontend Integration |

---

## 4. API Route Summary

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/students/register` | Public | Student registration with file upload |
| POST | `/api/students/login` | Public | Student login |
| POST | `/api/students/logout` | Student | Student logout |
| GET | `/api/students/profile` | Student | Get own profile |
| POST | `/api/students/update-profile` | Student | Request a profile edit |
| POST | `/api/employees/login` | Public | Employee login |
| POST | `/api/employees/logout` | Employee | Employee logout |
| GET | `/api/books/search` | Public | Search the catalogue |
| GET | `/api/books/:bookId` | Public | Get a single book |
| POST | `/api/books/request` | Student | Request a new book order |
| GET | `/api/books/requests/aggregated` | Employee | View aggregated student requests |
| POST | `/api/books/requests/reject` | Employee | Reject a student book request |
| POST | `/api/books/orders/place` | Employee | Place an order via Google Books API |
| POST | `/api/books/orders/manual` | Employee | Place a manual order |
| POST | `/api/books/orders/receive/:orderId` | Employee | Mark an order as received |
| POST | `/api/transactions/borrow` | Employee | Issue a book to a student |
| POST | `/api/transactions/return` | Employee | Process a book return |
| POST | `/api/transactions/renew` | Student | Renew a borrowed book |
| GET | `/api/transactions/history` | Student | View full borrowing history |
| POST | `/api/transactions/pay-fine` | Student | Pay outstanding fine |
| GET | `/api/management/pending-students` | Employee | View pending registrations |
| POST | `/api/management/approve-student` | Employee | Approve a student |
| POST | `/api/management/reject-student` | Employee | Reject a student |
| GET | `/api/management/edits/pending` | Employee | View pending profile edits |
| POST | `/api/management/approve-edit` | Employee | Approve a profile edit |
| POST | `/api/management/reject-edit` | Employee | Reject a profile edit |
| POST | `/api/auth/forgot-password` | Public | Request a password reset email |
| POST | `/api/auth/reset-password/:token` | Public | Reset password via one-time token |
