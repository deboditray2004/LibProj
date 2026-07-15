import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { House, BookOpen, ClockCounterClockwise, SignOut, List } from '@phosphor-icons/react'
import { useAuth } from '../../context/AuthContext'
import { studentLogout } from '../../api'
import { useState, useEffect } from 'react'

export default function StudentLayout() {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
  
  // Auto-collapse on small screens
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  const sidebarWidth = collapsed ? '80px' : '260px'

  return (
    <div style={styles.layout}>
      <aside style={{ ...styles.sidebar, width: sidebarWidth }}>
        <div style={{ ...styles.brand, justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? '0' : '0 1.5rem' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={styles.brandLogo}>Lib</div>
              <span style={styles.brandText}>Student Portal</span>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            style={styles.collapseBtn}
            title="Toggle Sidebar"
          >
            <List size={20} />
          </button>
        </div>

        <nav style={{ ...styles.nav, padding: collapsed ? '1.5rem 0' : '1.5rem 1rem', alignItems: collapsed ? 'center' : 'stretch' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navLink,
                backgroundColor: isActive ? 'var(--color-bg-surface)' : 'transparent',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 500 : 400,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '1rem' : '0.75rem 1rem',
              })}
              title={item.name}
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div style={{ ...styles.userSection, flexDirection: collapsed ? 'column' : 'row', padding: collapsed ? '1.25rem 0' : '1.25rem', gap: collapsed ? '1rem' : '0' }}>
          {!collapsed && (
            <div style={styles.userInfo}>
              <p style={styles.userName}>Name: {state.user?.name || (state.user as any)?.student?.name || 'Student'}</p>
              <p style={styles.userRole}>Card: {state.user?.cardNo || (state.user as any)?.student?.cardNo || 'N/A'}</p>
            </div>
          )}
          <button onClick={handleLogout} style={styles.logoutBtn} aria-label="Logout" title="Logout">
            <SignOut size={20} />
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
  },
  sidebar: {
    backgroundColor: 'var(--color-bg-base)',
    borderRight: '2px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    height: '100vh',
    transition: 'width 200ms ease',
  },
  brand: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid var(--color-border)',
  },
  brandLogo: {
    width: '32px',
    height: '32px',
    backgroundColor: 'var(--color-text-primary)',
    color: 'var(--color-bg-base)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    fontSize: '14px',
    borderRadius: '4px',
    flexShrink: 0,
  },
  brandText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-primary)',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
  },
  collapseBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    flex: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap',
  },
  userSection: {
    borderTop: '2px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  userName: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  userRole: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0',
    whiteSpace: 'nowrap',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 150ms ease, background-color 150ms ease',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
    minWidth: 0, // prevents flex item from overflowing
  },
}
