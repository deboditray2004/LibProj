# Library Management System - Product Requirements Document (PRD)

**Project Overview:** A full-stack, enterprise-grade Library Management System designed to handle complex business logic. The system strictly separates users into two independent roles: **Students** and **Library Management (Employees)**, and features robust concurrency control, automated penalty calculations, and an intelligent digital inventory.

---

## 1. Student Portal Features

### 1.1 Authentication & Onboarding
- **Registration Pipeline:** Students register by submitting their personal and academic details, along with their Government ID and photo. 
- **Approval Workflow:** All new registrations are placed in a "Pending" queue. Once vetted and approved by Management, the system automatically generates a unique 4-digit Library Card Number.
- **Secure Access:** Students log into their personalized dashboard using their Library Card Number and password.

### 1.2 Dashboard & Profile Management
- **Profile Updates:** Students can request edits to their personal details. To maintain data integrity, changes remain pending until authorized by Management.
- **Active Borrowings:** A real-time dashboard displaying currently borrowed books, issue dates, and exact due dates.
- **Financial Tracking:** A dynamic fine-calculation engine that displays exact overdue penalties in real-time.
- **Borrowing Constraints (Business Logic):**
  - **Duplicate Borrowing Block:** Students are strictly prevented from checking out multiple copies of the exact same book.
  - **The "Two-Fine" Time-Based Architecture:** Fines are calculated actively in memory based on the due date. The fine is only "frozen" into the database bank once the student physically returns or renews the book.
  - **Hard Limit (Physical Return Required):** Students are limited to **2 consecutive online renewals**. After the second renewal, physical return to the librarian is mandatory to settle the account.

### 1.3 Communication (Inbox System)
- **Notifications Inbox:** A built-in messaging system where students receive automated alerts (e.g., "Book is now available") and direct messages from the Library Management.
- **Feedback & Reviews:** A portal for students to submit condition reports, book reviews, or general feedback directly to the administration.

### 1.4 Digital Catalogue & Inventory
- **Guest Access:** Non-authenticated users can freely browse the public catalogue.
- **Search & Filters:** Real-time, highly performant search by Title, Author, and Category.
- **Predictive Availability:** The system displays real-time "Copies Left". If a book is out of stock, the engine automatically calculates and displays the exact date the next copy is expected to be returned.
- **Automated Request System:** If a book is missing or out of stock, students can submit a formal request. These requests are aggregated by ISBN and sent to the Management's purchasing pipeline.

---

## 2. Library Management (Admin) Features

### 2.1 Access & Employee Management
- **Secure Login:** Employees log in using pre-assigned, highly privileged Employee IDs.
- **Concurrency Control:** The backend utilizes Optimistic Concurrency Control (OCC) to ensure multiple librarians can work simultaneously at different desks without ever causing data race conditions.

### 2.2 Administrative Queues
- **Pending Fines Report:** A centralized dashboard to track, monitor, and follow up on students with actively accumulating fines.
- **Pending Approvals Pipeline:**
  - **New Students:** Review submitted Government IDs and approve/reject registrations with automated email triggers.
  - **Profile Edits:** Review and authorize requested student profile changes.

### 2.3 Inventory, Desk Operations & Order Management
- **Physical Borrowing (Desk):** The librarian scans the student's Library Card and the book's barcode. The system instantly processes the transaction, decrements inventory, and assigns a due date.
- **Physical Returns (Desk):** Scanning the book processes the return, calculates the final frozen fine, and increments library inventory.
- **Automated Order Pipeline (Global Integration):**
  - Librarians view aggregated student requests sorted by popularity.
  - By entering an ISBN, the system automatically fetches high-quality metadata and cover images from the **Google Books API**, caching the data to avoid redundant API calls.
- **Automated Restock Flow:**
  - When a physical book delivery arrives, the librarian clicks "Order Received".
  - The system instantly adds the book to the internal database, marks all related student requests as "Fulfilled", and fires off automated "Now Available" inbox notifications to the waiting students.

### 2.4 Feedback Loop
- **Review Center:** A dedicated portal to read incoming student feedback, resolve issues, and send direct replies to student inboxes.

---

## 3. System Architecture & Security

### 3.1 Data Validation (Zod)
- **Declarative Schemas:** All incoming network traffic is strictly validated against mathematical schemas. 
- **Validation Middleware:** A centralized gatekeeper intercepts requests, instantly rejecting malformed data with detailed feedback. The business logic only executes if the payload is 100% flawless.

### 3.2 Concurrency & ACID Compliance
- **Optimistic Concurrency Control (OCC):** Prevents edge-case race conditions during high-volume periods (e.g., preventing two librarians from checking out the final copy of a book simultaneously).
- **Atomic Transactions:** Critical multi-document database changes (e.g., decrementing book availability while simultaneously generating a transaction record) are wrapped in secure database sessions. If a sudden failure occurs mid-transaction, the entire operation rolls back to prevent corrupted or orphaned data.

### 3.3 Security & Error Handling
- **Global Error Handler:** A unified safety net guarantees that any thrown error—whether a database conflict, validation failure, or authorization error—is formatted into a clean, standardized JSON response, preventing sensitive stack traces from leaking.
- **Role-Based JWT Security:** Secure HTTP-only cookies and JSON Web Tokens ensure that every API endpoint is mathematically protected against unauthorized access.
