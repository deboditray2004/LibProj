import { useEffect } from 'react'
import { ChatCircleDots, EnvelopeSimple } from '@phosphor-icons/react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export default function FloatingContactBtn() {
  const { state } = useAuth()
  const isEmployee = state.user?.role === 'employee'

  useEffect(() => {
    if (!isEmployee) {
      const propertyId = import.meta.env.VITE_TAWKTO_PROPERTY_ID
      
      if (!propertyId) return

      window.Tawk_API = window.Tawk_API || {}
      window.Tawk_LoadStart = new Date()
      
      window.Tawk_API.onLoad = function() {
        window.Tawk_API.hideWidget()
      }

      const script = document.createElement('script')
      script.async = true
      script.src = `https://embed.tawk.to/${propertyId}`
      script.charset = 'UTF-8'
      script.setAttribute('crossorigin', '*')
      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [isEmployee])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (isEmployee) {
      window.open('https://dashboard.tawk.to/', '_blank')
    } else {
      if (window.Tawk_API && typeof window.Tawk_API.toggle === 'function') {
        window.Tawk_API.toggle()
      } else {
        toast('Helpdesk widget (Tawk.to) not configured.\\nPlease set VITE_TAWKTO_PROPERTY_ID in your .env', {
          icon: '🛠️'
        })
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className="floating-contact-btn"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: 'var(--color-bg-inverse)',
        color: 'var(--color-text-inverse)',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '4px 4px 0px 0px #111111',
        border: '2px solid #111111',
        cursor: 'pointer',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        zIndex: 1000,
      }}
      title={isEmployee ? "Open Shared Inbox" : "Contact Support"}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)'
        e.currentTarget.style.boxShadow = '6px 6px 0px 0px #111111'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0px, 0px)'
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px #111111'
      }}
    >
      {isEmployee ? <EnvelopeSimple size={24} weight="bold" /> : <ChatCircleDots size={24} weight="bold" />}
    </button>
  )
}
