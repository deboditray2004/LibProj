import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
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
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
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
    <>
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
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="students/pending" element={<PendingStudentsPage />} />
        <Route path="edits/pending" element={<PendingEditsPage />} />
        <Route path="requests" element={<BookRequestsPage />} />
        <Route path="catalogue" element={<EmployeeCataloguePage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Toaster 
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'var(--color-bg-surface)',
          color: 'var(--color-text-primary)',
          border: '2px solid var(--color-border)',
          borderRadius: '0px',
          boxShadow: '4px 4px 0px 0px #111111',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: 'var(--color-accent-seafoam)',
            secondary: '#111111',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--color-accent-rose)',
            secondary: '#111111',
          },
        },
      }}
    />
    </>
  )
}
