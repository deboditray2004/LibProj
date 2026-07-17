import { useState } from 'react'
import { ChatCircleDots, X, PaperPlaneRight, EnvelopeSimple } from '@phosphor-icons/react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { sendSupportMessage } from '../api'

export default function FloatingContactBtn() {
  const { state } = useAuth()
  const isEmployee = state.user?.role === 'employee'
  
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const supportMutation = useMutation({
    mutationFn: sendSupportMessage,
    onSuccess: () => {
      toast.success('Message sent! Management will reply to your email.')
      setIsOpen(false)
      setMessage('')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to send message')
    }
  })

  // Do not show the button on the landing page or for employees (they receive the emails, they don't send them)
  if (!state.user || isEmployee) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    supportMutation.mutate({ message: message.trim() })
  }

  return (
    <>
      {isOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleContainer}>
                <EnvelopeSimple size={24} color="var(--color-text-primary)" weight="duotone" />
                <h3 style={styles.modalTitle}>Contact Library</h3>
              </div>
              <button style={styles.closeButton} onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <p style={styles.helperText}>
                Send a direct message to the library management. They will reply to your registered email address ({state.user.email}).
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                style={styles.textarea}
                rows={5}
                disabled={supportMutation.isPending}
                autoFocus
              />
              <button 
                type="submit" 
                style={{
                  ...styles.submitButton,
                  opacity: (supportMutation.isPending || !message.trim()) ? 0.5 : 1,
                  cursor: (supportMutation.isPending || !message.trim()) ? 'not-allowed' : 'pointer'
                }}
                disabled={supportMutation.isPending || !message.trim()}
              >
                {supportMutation.isPending ? 'Sending...' : 'Send Message'}
                {!supportMutation.isPending && <PaperPlaneRight size={18} weight="bold" />}
              </button>
            </form>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
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
          title="Contact Support"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)'
            e.currentTarget.style.boxShadow = '6px 6px 0px 0px #111111'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0px, 0px)'
            e.currentTarget.style.boxShadow = '4px 4px 0px 0px #111111'
          }}
        >
          <ChatCircleDots size={24} weight="bold" />
        </button>
      )}
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: '2rem',
    zIndex: 2000,
  },
  modalContent: {
    backgroundColor: 'var(--color-bg-surface)',
    border: '2px solid var(--color-border)',
    boxShadow: '8px 8px 0px 0px #111111',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'slideUp 0.3s ease',
  },
  modalHeader: {
    padding: '1.25rem 1.5rem',
    borderBottom: '2px solid var(--color-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--color-bg-base)',
  },
  modalTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  modalTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '50%',
    transition: 'background-color 150ms ease, color 150ms ease',
  },
  form: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  helperText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 0.5rem 0',
    lineHeight: 1.5,
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    borderRadius: '8px',
    border: '2px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-base)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    outline: 'none',
    resize: 'none',
    transition: 'border-color 150ms ease',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.875rem',
    backgroundColor: 'var(--color-bg-inverse)',
    color: 'var(--color-text-inverse)',
    border: '2px solid #111111',
    borderRadius: '8px',
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 600,
    boxShadow: '2px 2px 0px 0px #111111',
    transition: 'transform 100ms ease, box-shadow 100ms ease',
  }
}
