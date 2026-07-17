import { useNavigate } from 'react-router-dom'
import { House, BookOpen, ClockCounterClockwise } from '@phosphor-icons/react'
import { useAuth } from '../../context/AuthContext'
import { studentLogout } from '../../api'
import SidebarLayout from './SidebarLayout'

export default function StudentLayout() {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await studentLogout()
    } catch (err) {
      console.error(err)
    } finally {
      dispatch({ type: 'LOGOUT' })
      navigate('/')
    }
  }

  const navItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <House size={20} /> },
    { name: 'Catalogue', path: '/student/catalogue', icon: <BookOpen size={20} /> },
    { name: 'History', path: '/student/history', icon: <ClockCounterClockwise size={20} /> },
  ]

  return (
    <SidebarLayout
      navItems={navItems}
      brandText="Student Portal"
      userDisplayName={state.user?.name || (state.user as any)?.student?.name || 'Student'}
      userSubtext={`Card: ${state.user?.cardNo || (state.user as any)?.student?.cardNo || 'N/A'}`}
      onLogout={handleLogout}
    />
  )
}
