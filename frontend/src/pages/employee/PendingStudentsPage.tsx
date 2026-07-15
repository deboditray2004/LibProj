import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPendingStudents, approveStudent, rejectStudent } from '../../api'
import { WarningCircle, UserCircle, IdentificationCard, X, Check } from '@phosphor-icons/react'

export default function PendingStudentsPage() {
  const queryClient = useQueryClient()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pendingStudents'],
    queryFn: getPendingStudents,
  })

  const approveMutation = useMutation({
    mutationFn: approveStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingStudents'] })
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingStudents'] })
      setRejectModalOpen(false)
      setRejectReason('')
    }
  })

  const students = data?.data || []

  const handleApprove = (id: string) => {
    approveMutation.mutate({ studentId: id })
  }

  const handleRejectClick = (id: string) => {
    setSelectedStudent(id)
    setRejectModalOpen(true)
  }

  const submitReject = () => {
    if (selectedStudent && rejectReason.trim()) {
      rejectMutation.mutate({ studentId: selectedStudent, reason: rejectReason })
    }
  }

  if (isLoading) return <div style={styles.center}>Loading pending students...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pending Approvals</h1>
        <p style={styles.subtitle}>Review new student registrations.</p>
      </header>

      {students.length === 0 ? (
        <div style={styles.emptyState}>No pending students at the moment.</div>
      ) : (
        <div style={styles.grid}>
          {students.map((student: any) => (
            <div key={student._id} className="card" style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.avatar}>
                  <UserCircle size={40} color="var(--color-text-muted)" weight="light" />
                </div>
                <div style={styles.info}>
                  <h3 style={styles.name}>{student.name}</h3>
                  <p style={styles.subInfo}>{student.rollNo} • {student.dept}</p>
                  <p style={styles.subInfo}>{student.email}</p>
                </div>
              </div>
              
              <div style={styles.cardBody}>
                <a href={student.govtId} target="_blank" rel="noreferrer" style={styles.idLink}>
                  <IdentificationCard size={18} /> View Govt ID
                </a>
              </div>

              <div style={styles.actions}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleRejectClick(student._id)}
                  disabled={approveMutation.isPending && approveMutation.variables?.studentId === student._id}
                >
                  <X size={16} /> Reject
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleApprove(student._id)}
                  disabled={approveMutation.isPending && approveMutation.variables?.studentId === student._id}
                >
                  {(approveMutation.isPending && approveMutation.variables?.studentId === student._id) ? 'Approving...' : <><Check size={16} /> Approve</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div style={styles.modalOverlay}>
          <div className="card" style={styles.modal}>
            <h3 style={styles.modalTitle}>Reject Application</h3>
            <p style={styles.modalDesc}>Please provide a reason for rejecting this student's application. They will receive an email with this reason.</p>
            <textarea 
              style={styles.textarea}
              placeholder="e.g. Blurry ID card, ID mismatch..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitReject} disabled={!rejectReason.trim() || rejectMutation.isPending} style={{ backgroundColor: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}>
                {rejectMutation.isPending ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  center: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-mono)',
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
  emptyState: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: 'var(--color-bg-surface)',
    borderRadius: 'var(--radius-md)',
    border: '1px dashed var(--color-border)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    gap: '1rem',
    padding: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
  },
  avatar: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflow: 'hidden',
  },
  name: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  subInfo: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  cardBody: {
    padding: '1.5rem',
    flex: 1,
  },
  idLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--color-accent-lavender)',
    textDecoration: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    padding: '8px 12px',
    backgroundColor: 'rgba(168, 160, 200, 0.1)',
    borderRadius: '4px',
    transition: 'background-color 200ms ease',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1.5rem',
    borderTop: '1px solid var(--color-border)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    padding: '1rem',
  },
  modal: {
    width: '100%',
    maxWidth: '400px',
    padding: '1.5rem',
  },
  modalTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  modalDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 1rem 0',
    lineHeight: 1.4,
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    backgroundColor: 'var(--color-bg-base)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    padding: '10px 12px',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    resize: 'vertical',
    marginBottom: '1.5rem',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  }
}
