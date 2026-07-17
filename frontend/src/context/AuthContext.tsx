import React, { createContext, useContext, useReducer } from 'react'
import type { AuthUser } from '../types/auth'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthAction =
  | { type: 'LOGIN'; payload: AuthUser }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true, isLoading: false }
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

interface AuthContextValue {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  React.useEffect(() => {
    const initAuth = async () => {
      try {
        const { default: api } = await import('../api/client')
        
        // Try student profile first
        try {
          const res = await api.get('/students/profile')
          if (res.data?.data) {
            dispatch({
              type: 'LOGIN',
              payload: {
                ...res.data.data,
                role: 'student',
              }
            })
            return
          }
        } catch (err) {
          // Fall back to employee
          try {
            const res = await api.get('/employees/profile')
            if (res.data?.data) {
              dispatch({
                type: 'LOGIN',
                payload: {
                  ...res.data.data,
                  role: 'employee',
                }
              })
              return
            }
          } catch (err2) {
            // Not logged in
          }
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    
    initAuth()
  }, [])

  if (state.isLoading) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading session...</div>
  }

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
