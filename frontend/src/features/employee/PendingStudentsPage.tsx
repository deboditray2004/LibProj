import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
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
      toast.success('Student approved successfully!')
      queryClient.invalidateQueries({ queryKey: ['pendingStudents'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to approve student.')
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectStudent,
    onSuccess: () => {
      toast.success('Student rejected.')
      queryClient.invalidateQueries({ queryKey: ['pendingStudents'] })
      setRejectModalOpen(false)
      setRejectReason('')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reject student.')
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
      {rejectModalOpen && <div className="modal-overlay" onClick={() => setRejectModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Reject Application</h3>
              <p style={styles.modalText}>Please provide a reason for rejecting this application. This will be emailed to the student.</p>
              <textarea 
                className="input"
                style={{ minHeight: '100px', resize: 'vertical' }}
                placeholder="Reason for rejection..."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
              />
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitReject} disabled={!rejectReason.trim() || rejectMutation.isPending} style={{ backgroundColor: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}>
                {rejectMutation.isPending ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
            </div>
          </div>
      }
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
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
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
  modalTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  }
}
