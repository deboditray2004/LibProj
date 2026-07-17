import { useNavigate } from 'react-router-dom'
import { House, Users, UserList, BookOpen, Receipt, ShoppingCart } from '@phosphor-icons/react'
import { useAuth } from '../../context/AuthContext'
import { employeeLogout } from '../../api'
import SidebarLayout from './SidebarLayout'

export default function EmployeeLayout() {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await employeeLogout()
    } catch (err) {
      console.error(err)
    } finally {
      dispatch({ type: 'LOGOUT' })
      navigate('/')
    }
  }

  const navItems = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: <House size={20} /> },
    { name: 'Pending Students', path: '/employee/students/pending', icon: <Users size={20} /> },
    { name: 'Pending Edits', path: '/employee/edits/pending', icon: <UserList size={20} /> },
    { name: 'Book Requests', path: '/employee/requests', icon: <Receipt size={20} /> },
    { name: 'Catalogue', path: '/employee/catalogue', icon: <BookOpen size={20} /> },
    { name: 'Orders', path: '/employee/orders', icon: <ShoppingCart size={20} /> },
  ]

  return (
    <SidebarLayout
      navItems={navItems}
      brandText="Employee Portal"
      userDisplayName={state.user?.name || (state.user as any)?.employee?.name || 'Employee'}
      userSubtext={`ID: ${state.user?.empId || (state.user as any)?.employee?.empId || 'N/A'}`}
      onLogout={handleLogout}
    />
  )
}
