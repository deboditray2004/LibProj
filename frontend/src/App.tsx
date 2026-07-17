import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext'

import React, { Suspense, lazy } from 'react'

const LandingPage = lazy(() => import('./features/public/LandingPage'))
const StudentLoginPage = lazy(() => import('./features/auth/StudentLoginPage'))
const EmployeeLoginPage = lazy(() => import('./features/auth/EmployeeLoginPage'))
const RegisterPage = lazy(() => import('./features/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./features/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./features/auth/ResetPasswordPage'))
const CataloguePage = lazy(() => import('./features/public/CataloguePage'))

const StudentLayout = lazy(() => import('./components/layout/StudentLayout'))
const StudentDashboard = lazy(() => import('./features/student/StudentDashboard'))
const StudentCataloguePage = lazy(() => import('./features/student/StudentCataloguePage'))
const StudentHistoryPage = lazy(() => import('./features/student/StudentHistoryPage'))

const EmployeeLayout = lazy(() => import('./components/layout/EmployeeLayout'))
const EmployeeDashboard = lazy(() => import('./features/employee/EmployeeDashboard'))
const PendingStudentsPage = lazy(() => import('./features/employee/PendingStudentsPage'))
const PendingEditsPage = lazy(() => import('./features/employee/PendingEditsPage'))
const BookRequestsPage = lazy(() => import('./features/employee/BookRequestsPage'))
const EmployeeCataloguePage = lazy(() => import('./features/employee/EmployeeCataloguePage'))
const OrdersPage = lazy(() => import('./features/employee/OrdersPage'))
import ErrorBoundary from './components/ErrorBoundary'

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
    <ErrorBoundary>
    <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>Loading...</div>}>
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/student" element={<StudentLoginPage />} />
      <Route path="/login/employee" element={<EmployeeLoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/catalogue" element={<CataloguePage />} />

      
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

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Suspense>
    </ErrorBoundary>
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
