import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPendingEdits, approveEdit, rejectEdit } from '../../api'
import { WarningCircle, UserCircle, X, Check, ArrowRight } from '@phosphor-icons/react'

export default function PendingEditsPage() {
  const queryClient = useQueryClient()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pendingEdits'],
    queryFn: getPendingEdits,
  })

  const approveMutation = useMutation({
    mutationFn: approveEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingEdits'] })
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectEdit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingEdits'] })
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

  if (isLoading) return <div style={styles.center}>Loading pending edits...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pending Profile Edits</h1>
        <p style={styles.subtitle}>Review requested changes to student profiles.</p>
      </header>

      {students.length === 0 ? (
        <div style={styles.emptyState}>No pending profile edits at the moment.</div>
      ) : (
        <div style={styles.list}>
          {students.map((student: any) => {
            const edits = student.pendingEdits
            const changes = [
              { field: 'Name', old: student.name, new: edits.name },
              { field: 'Email', old: student.email, new: edits.email },
              { field: 'Address', old: student.addr, new: edits.addr },
            ].filter(c => c.old !== c.new)

            return (
              <div key={student._id} className="card" style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.avatar}>
                    <UserCircle size={40} color="var(--color-text-muted)" weight="light" />
                  </div>
                  <div style={styles.info}>
                    <h3 style={styles.name}>{student.name}</h3>
                    <p style={styles.subInfo}>{student.rollNo} • {student.cardNo}</p>
                  </div>
                </div>
                
                <div style={styles.cardBody}>
                  <h4 style={styles.diffTitle}>Requested Changes:</h4>
                  <div style={styles.diffList}>
                    {changes.map((change, i) => (
                      <div key={i} style={styles.diffRow}>
                        <span style={styles.diffField}>{change.field}</span>
                        <div style={styles.diffValues}>
                          <span style={styles.oldValue}>{change.old || '(empty)'}</span>
                          <ArrowRight size={14} color="var(--color-text-muted)" />
                          <span style={styles.newValue}>{change.new || '(empty)'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
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
            )
          })}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div style={styles.modalOverlay}>
          <div className="card" style={styles.modal}>
            <h3 style={styles.modalTitle}>Reject Edits</h3>
            <p style={styles.modalDesc}>Please provide a reason for rejecting these profile edits.</p>
            <textarea 
              style={styles.textarea}
              placeholder="e.g. Invalid address format..."
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
  list: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  subInfo: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  cardBody: {
    padding: '1.5rem',
  },
  diffTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    margin: '0 0 1rem 0',
    letterSpacing: '0.05em',
  },
  diffList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  diffRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem',
    backgroundColor: 'var(--color-bg-base)',
    borderRadius: '4px',
    border: '1px solid var(--color-border)',
  },
  diffField: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    width: '100px',
  },
  diffValues: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  oldValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    textDecoration: 'line-through',
    flex: 1,
    textAlign: 'right',
  },
  newValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-accent-seafoam)',
    flex: 1,
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
