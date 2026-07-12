# Library Management System - Product Requirements Document (PRD)

**Project Overview:** A full-stack, role-based Library Management System designed to handle complex business logic including finite state machine approvals, dynamic fine calculations, automated notifications, and concurrent transactions.

**User Roles:** System architecture strictly separates users into two independent collections: **Students** and **Employees** (Library Management).

---

## 1. Student Portal Features

### 1.1 Authentication & Onboarding
- **Registration Pipeline:** [`student.controller.js` -> `registerStudent` (`POST /api/v1/students/register`)] Students register by submitting Personal details (Name, DOB, Address, Govt ID, Photo) and Academic details (Department, Roll No).
- **Approval Workflow:** Registrations are placed in a "Pending" state. Once approved by Management, the system generates and assigns a unique 4-digit Library Card No (Format: `ID-XXXX`).
- **Login:** [`student.controller.js` -> `loginStudent` (`POST /api/v1/students/login`)] Secure login using the generated Library Card No and password.
- **Logout:** [`student.controller.js` -> `logoutStudent` (`POST /api/v1/students/logout`)]

### 1.2 Dashboard & Profile Management
- **Profile Updates:** [`student.controller.js` -> `requestProfileUpdate` (`PATCH /api/v1/students/profile`)] Students can edit their personal details. Changes require management approval before taking effect across the system.
- **View Profile:** [`student.controller.js` -> `getStudentProfile` (`GET /api/v1/students/profile`)] Returns current user details.
- **Active Borrowings:** View currently borrowed books, issue dates, and exact due dates.
- **Financial Tracking:** View pending fines dynamically calculated for overdue books. Includes a link to a payment portal integration.
- **Borrowing Constraints (Business Logic):**
  - **Duplicate Borrowing Block:** Students are strictly prevented from borrowing a second copy of a book they already have an active transaction for.
  - **The "Two-Fine" Time-Based Architecture:** The backend utilizes an elegant `frozenFine` (database field) and `activeFine` (memory-calculated) architecture.
    - Returning or Renewing a book instantly locks the current `activeFine` into the `frozenFine` database bank.
    - **Active Fine Payment Block:** Students are strictly prohibited from paying an actively accumulating fine. They must first physically Return or Renew the book to freeze the fine before paying.
  - **The Dual-Mode Payment System:** [`transaction.controller.js` -> `payFine` (`POST /api/v1/transactions/pay-fine`)]
    - Students can pay for a single transaction (by providing `transactionId`), or hit "Pay All" to instantly clear all frozen fines across their entire history.
    - **Hard Limit (Physical Return Required):** Students are strictly limited to **2 consecutive renewals**. If `renewalCount === 2`, the student MUST physically return the book to the librarian to freeze and settle the final fine.

### 1.3 Communication (Inbox System)
- **Notifications Inbox:** [`communication.controller.js` -> `getNotifications` (`GET /api/v1/communication/notifications`)] Students receive automated system notifications and direct messages from Management regarding approvals or restocks.
- **Feedback & Reviews:** [`communication.controller.js` -> `submitFeedback` (`POST /api/v1/communication/feedback`)] Students can submit feedback, condition reports, or general reviews to the Management team.

### 1.4 Digital Catalogue
- **Guest Access:** Non-authenticated users can browse the public catalogue.
- **Search & Filters:** [`book.controller.js` -> `getAllBooks` (`GET /api/v1/books`)] Real-time search by Title or Author, with advanced filtering by Book Category. Designed to handle a vast inventory.
- **Inventory & Availability Engine:** [`book.controller.js` -> `getBookDetails` (`GET /api/v1/books/:id`)]
  - Displays real-time "Copies Left" for every book.
  - **Predictive Availability:** If copies = 0, the system calculates and displays the earliest time/date a copy will become available (based on the nearest due date of borrowed copies).
- **Requests System:** [`communication.controller.js` -> `createStudentRequest` (`POST /api/v1/communication/request`)] Students can request the library to order a completely new book or request additional copies of a currently out-of-stock book.

---

## 2. Library Management (Admin) Features

### 2.1 Access & Employee Management
- **Login:** [`employee.controller.js` -> `loginEmployee` (`POST /api/v1/employees/login`)] Employees log in using pre-assigned Employee IDs.
- **Logout:** [`employee.controller.js` -> `logoutEmployee` (`POST /api/v1/employees/logout`)]
- **Concurrency Control:** The backend utilizes atomic database operations (Optimistic Concurrency Control) to ensure multiple employees can work simultaneously without causing data race conditions.

### 2.2 Administrative Queues
- **Pending Fines Report:** Centralized dashboard to track and follow up on students with active fines.
- **Pending Approvals Pipeline:**
  - **New Students:** [`employee.controller.js` -> `approveStudent` (`POST /api/v1/employees/approve-student/:id`)] Review Govt IDs and details. Accept or Reject with a mandatory reason/message. Generates cardNo.
  - **Profile Edits:** [`employee.controller.js` -> `approveProfileUpdate` (`POST /api/v1/employees/approve-profile/:id`)] Review requested changes from existing students. Accept or Reject with a message. Merges pendingEdits.

### 2.3 Inventory, Desk Operations & Order Management
- **Add New Book to Catalogue:** [`book.controller.js` -> `addBook` (`POST /api/v1/books`)] Admin adds a book to the system.
- **Physical Borrowing (Desk):** [`transaction.controller.js` -> `borrowBook` (`POST /api/v1/transactions/borrow`)] Employee scans student's Library Card (`cardNo`) and book barcode (`isbn`). Backend automatically looks up IDs and generates the active transaction.
- **Physical Returns (Desk):** [`transaction.controller.js` -> `returnBook` (`POST /api/v1/transactions/return`)] Employee scans `cardNo` and `isbn`. Backend automatically finds the active transaction, freezes the fine, and sets the `rtrnDate`.
- **Order Pipeline:** [`communication.controller.js` -> `placeAdminOrder` (`POST /api/v1/communication/order`)] Interface to order new books or request more copies of existing ones. Tracks the name of the book and the number of copies ordered.
- **Automated Restock Flow:** [`communication.controller.js` -> `receiveAdminOrder` (`POST /api/v1/communication/order/:id/receive`)]
  - When an order arrives, the employee clicks **"Order Received"**.
  - The system updates the inventory count.
  - **Automation:** The system scans the database for any pending "Student Requests" for that specific book, sends an automated "Now Available" notification to those students' inboxes, and clears the pending requests.

### 2.4 Feedback Loop
- **Review Center:** [`communication.controller.js` -> `replyToFeedback` (`POST /api/v1/communication/feedback/:id/reply`)] Read incoming student feedback/reviews and reply directly. Replies are routed to the student's Notification Inbox.
