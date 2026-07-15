import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Public Pages
import LandingPage from './pages/public/LandingPage'
import StudentLoginPage from './pages/public/StudentLoginPage'
import EmployeeLoginPage from './pages/public/EmployeeLoginPage'
import RegisterPage from './pages/public/RegisterPage'
import ForgotPasswordPage from './pages/public/ForgotPasswordPage'
import ResetPasswordPage from './pages/public/ResetPasswordPage'
import CataloguePage from './pages/public/CataloguePage'

// Student Pages
import StudentLayout from './components/layout/StudentLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentCataloguePage from './pages/student/StudentCataloguePage'
import StudentHistoryPage from './pages/student/StudentHistoryPage'

// Employee Pages
import EmployeeLayout from './components/layout/EmployeeLayout'
import PendingStudentsPage from './pages/employee/PendingStudentsPage'
import PendingEditsPage from './pages/employee/PendingEditsPage'
import BookRequestsPage from './pages/employee/BookRequestsPage'
import EmployeeCataloguePage from './pages/employee/EmployeeCataloguePage'
import OrdersPage from './pages/employee/OrdersPage'

function ProtectedRoute({ children, role }: { children: React.ReactNode; role: 'student' | 'employee' }) {
  const { state } = useAuth()
  if (!state.isAuthenticated || state.user?.role !== role) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/student" element={<StudentLoginPage />} />
      <Route path="/login/employee" element={<EmployeeLoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/catalogue" element={<CataloguePage />} />

      {/* Student Portal */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="catalogue" element={<StudentCataloguePage />} />
        <Route path="history" element={<StudentHistoryPage />} />
      </Route>

      {/* Employee Portal */}
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute role="employee">
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="pending-students" replace />} />
        <Route path="pending-students" element={<PendingStudentsPage />} />
        <Route path="pending-edits" element={<PendingEditsPage />} />
        <Route path="book-requests" element={<BookRequestsPage />} />
        <Route path="catalogue" element={<EmployeeCataloguePage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
