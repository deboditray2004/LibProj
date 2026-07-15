import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { borrowBook, returnBook } from '../../api'
import { CheckCircle, WarningCircle, BookBookmark, ArrowUUpLeft } from '@phosphor-icons/react'

export default function EmployeeDashboard() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Front Desk</h1>
        <p style={styles.subtitle}>Issue and return books for students.</p>
      </header>

      <div style={styles.grid}>
        <IssueDesk />
        <ReturnDesk />
      </div>
    </div>
  )
}

function IssueDesk() {
  const [form, setForm] = useState({ cardNo: '', isbn: '' })
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: borrowBook,
    onSuccess: () => {
      setSuccess('Book issued successfully!')
      setError(null)
      setForm({ cardNo: '', isbn: '' })
      setTimeout(() => setSuccess(null), 3000)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to issue book.')
      setSuccess(null)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.cardNo || !form.isbn) return setError('Please fill all fields.')
    mutation.mutate(form)
  }

  return (
    <div className="card" style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ ...styles.iconBox, backgroundColor: 'rgba(168, 160, 200, 0.1)', color: 'var(--color-accent-lavender)' }}>
            <BookBookmark size={24} />
          </div>
          <h2 style={styles.cardTitle}>Issue Book</h2>
        </div>
      </div>
      <div style={styles.cardBody}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Student Card No</label>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="e.g. LIB-STU-123"
              value={form.cardNo} 
              onChange={e => setForm({...form, cardNo: e.target.value})} 
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Book ISBN</label>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="e.g. 9781234567897"
              value={form.isbn} 
              onChange={e => setForm({...form, isbn: e.target.value})} 
            />
          </div>

          {(error || success) && (
            <div style={error ? styles.errorAlert : styles.successAlert}>
              {error ? <WarningCircle size={16} /> : <CheckCircle size={16} />}
              {error || success}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Issuing...' : 'Issue Book'}
          </button>
        </form>
      </div>
    </div>
  )
}

function ReturnDesk() {
  const [form, setForm] = useState({ cardNo: '', isbn: '' })
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: returnBook,
    onSuccess: () => {
      setSuccess('Book returned successfully!')
      setError(null)
      setForm({ cardNo: '', isbn: '' })
      setTimeout(() => setSuccess(null), 3000)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to return book.')
      setSuccess(null)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.cardNo || !form.isbn) return setError('Please fill all fields.')
    mutation.mutate(form)
  }

  return (
    <div className="card" style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ ...styles.iconBox, backgroundColor: 'rgba(143, 191, 176, 0.1)', color: 'var(--color-accent-seafoam)' }}>
            <ArrowUUpLeft size={24} />
          </div>
          <h2 style={styles.cardTitle}>Return Book</h2>
        </div>
      </div>
      <div style={styles.cardBody}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Student Card No</label>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="e.g. LIB-STU-123"
              value={form.cardNo} 
              onChange={e => setForm({...form, cardNo: e.target.value})} 
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Book ISBN</label>
            <input 
              style={styles.input} 
              type="text" 
              placeholder="e.g. 9781234567897"
              value={form.isbn} 
              onChange={e => setForm({...form, isbn: e.target.value})} 
            />
          </div>

          {(error || success) && (
            <div style={error ? styles.errorAlert : styles.successAlert}>
              {error ? <WarningCircle size={16} /> : <CheckCircle size={16} />}
              {error || success}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center', backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Processing...' : 'Process Return'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    padding: '1.5rem',
  },
  cardHeader: {
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '1rem',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    backgroundColor: 'var(--color-bg-base)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '10px 12px',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    width: '100%',
    transition: 'border-color 200ms ease',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(212, 160, 160, 0.1)',
    border: '1px solid var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-accent-rose)',
    fontSize: '13px',
    fontFamily: 'var(--font-sans)',
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(143, 191, 176, 0.1)',
    border: '1px solid var(--color-accent-seafoam)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-accent-seafoam)',
    fontSize: '13px',
    fontFamily: 'var(--font-sans)',
  },
}
