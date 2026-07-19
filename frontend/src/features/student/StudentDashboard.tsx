import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getStudentProfile, getTransactionHistory, payFine, renewBook } from '../../api'
import { User, Receipt, Books, BookOpen } from '@phosphor-icons/react'
import { useState } from 'react'

export default function StudentDashboard() {
  const queryClient = useQueryClient()
  const [payStatus, setPayStatus] = useState<{ loading: boolean; error: string | null; success: boolean }>({ loading: false, error: null, success: false })

  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState<any>({})
  const [updateStatus, setUpdateStatus] = useState({ loading: false, error: null as string | null, success: false })


  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['studentProfile'],
    queryFn: getStudentProfile,
    refetchInterval: 1000,
  })

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['studentTransactions'],
    queryFn: getTransactionHistory,
    refetchInterval: 1000,
  })

  const renewMutation = useMutation({
    mutationFn: (transactionId: string) => renewBook({ transactionId }),
    onSuccess: () => {
      toast.success('Book renewed successfully!')
      queryClient.invalidateQueries({ queryKey: ['studentTransactions'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to renew book.')
    }
  })

  const profile = profileData?.data
  const transactions = historyData?.data || []

  const activeBorrows = transactions.filter((t: any) => !t.rtrnDate)
  const finedTransactions = transactions.filter((t: any) => t.totalFine > 0)
  const totalFrozenFine = transactions.reduce((sum: number, t: any) => sum + (t.frozenFine || 0), 0)

  const handlePayFines = async (transactionId?: string) => {
    setPayStatus({ loading: true, error: null, success: false })
    try {
      if (transactionId) {
        await payFine({ transactionId })
      } else {
        await payFine({ payAll: true })
      }
      setPayStatus({ loading: false, error: null, success: true })
      toast.success('Fine paid successfully!')
      queryClient.invalidateQueries({ queryKey: ['studentTransactions'] })
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to pay fines')
      setPayStatus({ loading: false, error: null, success: false })
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateStatus({ loading: true, error: null, success: false })
    try {
      const { requestProfileUpdate } = await import('../../api')
      await requestProfileUpdate(editForm)
      setUpdateStatus({ loading: false, error: null, success: true })
      toast.success('Profile update requested!')
      setEditMode(false)
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to request update')
      setUpdateStatus({ loading: false, error: null, success: false })
    }
  }


  if (profileLoading || historyLoading) {
    return <div style={styles.loadingState}>Loading dashboard...</div>
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome back, {profile?.name?.split(' ')[0]}</h1>
        <p style={styles.subtitle}>Here is your library summary.</p>
      </header>

      <div style={styles.grid}>
        
        <div className="card" style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User size={24} color="var(--color-accent-lavender)" />
              <h2 style={styles.cardTitle}>Profile Summary</h2>
            </div>
            {!editMode && (
              <button
                className="btn btn-secondary"
                style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: '12px' }}
                onClick={() => {
                  setEditForm(profile || {})
                  setEditMode(true)
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
          <div style={styles.cardBody}>
            {editMode ? (
              <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={styles.infoRow}>
                  <label style={styles.infoLabel}>Name</label>
                  <input style={styles.input} type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                </div>
                <div style={styles.infoRow}>
                  <label style={styles.infoLabel}>Email</label>
                  <input style={styles.input} type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} />
                </div>
                <div style={styles.infoRow}>
                  <label style={styles.infoLabel}>Address</label>
                  <input style={styles.input} type="text" value={editForm.addr || ''} onChange={e => setEditForm({...editForm, addr: e.target.value})} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={updateStatus.loading}>
                    {updateStatus.loading ? 'Submitting...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Name</span>
                  <span style={styles.infoValue}>{profile?.name}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Card No</span>
                  <span style={styles.infoValue}>{profile?.cardNo}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Roll No</span>
                  <span style={styles.infoValue}>{profile?.rollNo}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Department</span>
                  <span style={styles.infoValue}>{profile?.dept}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Email</span>
                  <span style={styles.infoValue}>{profile?.email}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Address</span>
                  <span style={styles.infoValue}>{profile?.addr}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Date of Birth</span>
                  <span style={styles.infoValue}>{new Date(profile?.dob).toLocaleDateString()}</span>
                </div>
              </>
            )}
          </div>
        </div>

        
        <div className="card" style={styles.card}>
          <div style={styles.cardHeader}>
            <Receipt size={24} color="var(--color-accent-rose)" />
            <h2 style={styles.cardTitle}>Library Fines</h2>
          </div>
          <div style={styles.cardBody}>
            {finedTransactions.length === 0 ? (
              <p style={styles.emptyState}>You have no library fines.</p>
            ) : (
              <div style={styles.bookList}>
                {finedTransactions.map((txn: any) => {
                  const isReturned = !!txn.rtrnDate
                  return (
                    <div key={txn._id} style={styles.fineItem}>
                      <div style={styles.fineItemLeft}>
                        {txn.b_id?.coverImg ? (
                          <img src={txn.b_id.coverImg} alt="Book cover" style={styles.fineThumb} />
                        ) : (
                          <div style={{...styles.fineThumb, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-base)'}}>
                            <BookOpen size={24} color="var(--color-text-muted)" />
                          </div>
                        )}
                        <div style={styles.fineItemInfo}>
                          <p style={styles.fineItemTitle}>{txn.b_id?.title}</p>
                          <p style={styles.fineItemAmount}>
                            {isReturned 
                              ? `₹${txn.frozenFine} (Frozen)` 
                              : `₹${txn.totalFine} ${txn.frozenFine > 0 ? `(₹${txn.frozenFine} Frozen + ₹${txn.activeFine} Active)` : '(Active)'}`
                            }
                          </p>
                        </div>
                      </div>
                      <div style={styles.fineItemRight}>
                        {isReturned ? (
                          <button
                            className="btn btn-primary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => handlePayFines(txn._id)}
                            disabled={payStatus.loading}
                          >
                            Pay
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                            onClick={() => renewMutation.mutate(txn._id)}
                            disabled={renewMutation.isPending && renewMutation.variables === txn._id}
                          >
                            {(renewMutation.isPending && renewMutation.variables === txn._id) ? '...' : 'Renew'}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {totalFrozenFine > 0 && (
              <button
                className="btn btn-primary"
                onClick={() => handlePayFines()}
                disabled={payStatus.loading}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {payStatus.loading ? 'Processing...' : `Pay All Frozen Fines (₹${totalFrozenFine})`}
              </button>
            )}

            
          </div>
        </div>

        
        <div className="card" style={{ ...styles.card, flex: '1 1 100%' }}>
          <div style={styles.cardHeader}>
            <Books size={24} color="var(--color-accent-amber)" />
            <h2 style={styles.cardTitle}>Currently Borrowed Books</h2>
          </div>
          <div style={styles.cardBody}>
            {activeBorrows.length === 0 ? (
              <p style={styles.emptyState}>You have no active borrowed books.</p>
            ) : (
              <div style={styles.bookListFlex}>
                {activeBorrows.map((txn: any) => {
                  const isOverdue = new Date(txn.dueDate).getTime() < Date.now()
                  return (
                    <div key={txn._id} style={styles.bookItemFlex}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {txn.b_id?.coverImg ? (
                          <img src={txn.b_id.coverImg} alt="Book cover" style={styles.fineThumb} />
                        ) : (
                          <div style={{...styles.fineThumb, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-base)'}}>
                            <BookOpen size={24} color="var(--color-text-muted)" />
                          </div>
                        )}
                        <div style={styles.bookInfo}>
                          <p style={styles.bookTitle}>{txn.b_id?.title || 'Unknown Book'}</p>
                          <p style={styles.bookMeta}>Borrowed: {new Date(txn.brwDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div style={styles.bookStatus}>
                        <span className={`badge ${isOverdue ? 'badge-rose' : 'badge-seafoam'}`}>
                          Due: {new Date(txn.dueDate).toLocaleDateString()}
                        </span>
                        {isOverdue && <span style={styles.overdueText}>Overdue (+₹{txn.activeFine})</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem 8rem 2rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    width: '100%',
  },
  loadingState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontFamily: 'var(--font-mono)',
    color: 'var(--color-text-muted)',
    fontSize: '13px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '28px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    color: 'var(--color-text-secondary)',
    margin: 0,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    alignItems: 'flex-start',
  },
  card: {
    flex: '1 1 400px',
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    gap: '1.5rem',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    borderBottom: '2px solid var(--color-border)',
    paddingBottom: '1rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 0',
    borderBottom: '1px solid var(--color-border)',
  },
  infoLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  infoValue: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-primary)',
    fontWeight: 500,
  },
  emptyState: {
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: 0,
    textAlign: 'center',
    padding: '2rem 0',
  },
  bookList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  fineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem',
    border: '2px solid var(--color-border)',
  },
  fineItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  fineThumb: {
    width: '40px',
    height: '60px',
    objectFit: 'cover',
  },
  fineItemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  fineItemTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  fineItemAmount: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-accent-rose)',
    margin: 0,
  },
  fineItemRight: {
    display: 'flex',
    alignItems: 'center',
  },
  bookListFlex: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  bookItemFlex: {
    flex: '1 1 300px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    border: '2px solid var(--color-border)',
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  bookTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--color-text-primary)',
    margin: 0,
  },
  bookMeta: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    margin: 0,
  },
  bookStatus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
  },
  overdueText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-accent-rose)',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(239, 137, 137, 0.1)',
    color: 'var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    marginTop: '1rem',
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(163, 230, 210, 0.1)',
    color: 'var(--color-accent-seafoam)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    marginTop: '1rem',
  },
}
