import React, { createContext, useContext, useReducer } from 'react'

// --- Types ---
export type Role = 'student' | 'employee'

export interface AuthUser {
  _id: string
  name?: string
  cardNo?: number
  empId?: number
  email?: string
  role: Role
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}

type AuthAction =
  | { type: 'LOGIN'; payload: AuthUser }
  | { type: 'LOGOUT' }

// --- Reducer ---
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true }
    case 'LOGOUT':
      return { user: null, isAuthenticated: false }
    default:
      return state
  }
}

// --- Context ---
interface AuthContextValue {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
