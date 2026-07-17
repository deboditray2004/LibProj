import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-base)' }}>
          <h1 style={{ color: 'var(--color-accent-rose)', marginBottom: '1rem', fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 600 }}>Something went wrong.</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontFamily: 'var(--font-sans)' }}>The application encountered an unexpected error.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-primary)', border: '2px solid var(--color-border)', cursor: 'pointer', fontWeight: 600, fontFamily: 'var(--font-sans)' }}
          >
            Reload Application
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
