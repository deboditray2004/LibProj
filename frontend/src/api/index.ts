import api from './client'

export const studentLogin = (data: { cardNo: string; password: string }) =>
  api.post('/students/login', data).then((r) => r.data)

export const studentLogout = () =>
  api.post('/students/logout').then((r) => r.data)

export const getStudentProfile = () =>
  api.get('/students/profile').then((r) => r.data)

export const registerStudent = (formData: FormData) =>
  api.post('/students/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data)

export const requestProfileUpdate = (data: Record<string, string>) =>
  api.post('/students/update-profile', data).then((r) => r.data)

export const employeeLogin = (data: { empId: string; password: string }) =>
  api.post('/employees/login', data).then((r) => r.data)

export const employeeLogout = () =>
  api.post('/employees/logout').then((r) => r.data)

export const forgotPassword = (data: { email: string; role: 'student' | 'employee' }) =>
  api.post('/auth/forgot-password', data).then((r) => r.data)

export const resetPassword = (token: string, data: { password: string; confirmPassword: string }) =>
  api.post(`/auth/reset-password/${token}`, data).then((r) => r.data)

export const searchBooks = (params: { search?: string; category?: string }) =>
  api.get('/books/search', { params }).then((r) => r.data)

export const getCategories = () =>
  api.get('/books/categories').then((r) => r.data)

export const getBookById = (bookId: string) =>
  api.get(`/books/${bookId}`).then((r) => r.data)

export const requestBook = (data: { isbn: string }) =>
  api.post('/books/request', data).then((r) => r.data)

export const getTransactionHistory = () =>
  api.get('/transactions/history').then((r) => r.data)

export const renewBook = (data: { transactionId: string }) =>
  api.post('/transactions/renew', data).then((r) => r.data)

export const payFine = (data: { transactionId?: string; payAll?: boolean }) =>
  api.post('/transactions/pay-fine', data).then((r) => r.data)

export const borrowBook = (data: { cardNo: string; isbn: string }) =>
  api.post('/transactions/borrow', data).then((r) => r.data)

export const returnBook = (data: { cardNo: string; isbn: string }) =>
  api.post('/transactions/return', data).then((r) => r.data)

export const getPendingStudents = () =>
  api.get('/management/pending-students').then((r) => r.data)

export const approveStudent = (data: { studentId: string }) =>
  api.post('/management/approve-student', data).then((r) => r.data)

export const rejectStudent = (data: { studentId: string; reason: string }) =>
  api.post('/management/reject-student', data).then((r) => r.data)

export const getPendingEdits = () =>
  api.get('/management/edits/pending').then((r) => r.data)

export const approveEdit = (data: { studentId: string }) =>
  api.post('/management/approve-edit', data).then((r) => r.data)

export const rejectEdit = (data: { studentId: string; reason: string }) =>
  api.post('/management/reject-edit', data).then((r) => r.data)

export const getAggregatedRequests = () =>
  api.get('/books/requests/aggregated').then((r) => r.data)

export const rejectBookRequest = (data: { isbn: string }) =>
  api.post('/books/requests/reject', data).then((r) => r.data)

export const getAllOrders = () =>
  api.get('/books/orders').then((r) => r.data)

export const placeOrder = (data: { isbn: string; copiesOrdered: number }) =>
  api.post('/books/orders/place', data).then((r) => r.data)

export const manualOrder = (data: { isbn: string; copiesOrdered: number }) =>
  api.post('/books/orders/manual', data).then((r) => r.data)

export const receiveOrder = (orderId: string) =>
  api.post(`/books/orders/receive/${orderId}`).then((r) => r.data)
