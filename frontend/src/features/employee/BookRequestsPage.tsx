import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getAggregatedRequests, placeOrder, rejectBookRequest, rejectAllBookRequests } from '../../api'
import { WarningCircle, BookOpen, X, ShoppingCart } from '@phosphor-icons/react'

export default function BookRequestsPage() {
  const queryClient = useQueryClient()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [rejectAllModalOpen, setRejectAllModalOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  
  const [copiesOrdered, setCopiesOrdered] = useState(1)
  

  const { data, isLoading, isError } = useQuery({
    queryKey: ['aggregatedRequests'],
    queryFn: getAggregatedRequests,
    refetchInterval: 1000,
  })

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      toast.success('Order placed successfully!')
      queryClient.invalidateQueries({ queryKey: ['aggregatedRequests'] })
      setOrderModalOpen(false)
      setCopiesOrdered(1)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to place order.')
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectBookRequest,
    onSuccess: () => {
      toast.success('Requests rejected.')
      queryClient.invalidateQueries({ queryKey: ['aggregatedRequests'] })
      setRejectModalOpen(false)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reject requests.')
    }
  })

  const rejectAllMutation = useMutation({
    mutationFn: rejectAllBookRequests,
    onSuccess: () => {
      toast.success('All requests rejected')
      queryClient.invalidateQueries({ queryKey: ['aggregatedRequests'] })
      setRejectAllModalOpen(false)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reject all requests')
    }
  })

  const requestGroups = data?.data || []

  const handleOrderClick = (group: any) => {
    setSelectedGroup(group)
    setCopiesOrdered(group.count || 1) // default to number of requests
    setOrderModalOpen(true)
  }

  const handleRejectClick = (group: any) => {
    setSelectedGroup(group)
    setRejectModalOpen(true)
  }

  const submitOrder = () => {
    if (selectedGroup) {
      orderMutation.mutate({
        isbn: selectedGroup._id,
        copiesOrdered
      })
    }
  }

  const submitReject = () => {
    if (selectedGroup) {
      rejectMutation.mutate({
        isbn: selectedGroup._id
      })
    }
  }

  if (isLoading) return <div style={styles.center}>Loading book requests...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={{ flex: 1 }}>
          <h1 style={styles.title}>Book Requests</h1>
          <p style={styles.subtitle}>Aggregated student requests for out-of-stock books.</p>
        </div>
        {requestGroups.length > 0 && (
          <button 
            className="btn btn-secondary" 
            style={{ padding: '8px 16px', color: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}
            onClick={() => setRejectAllModalOpen(true)}
            disabled={rejectAllMutation.isPending}
          >
            {rejectAllMutation.isPending ? 'Rejecting...' : 'Reject All'}
          </button>
        )}
      </header>

      {requestGroups.length === 0 ? (
        <div style={styles.emptyState}>No pending book requests at the moment.</div>
      ) : (
        <div style={styles.list}>
          {requestGroups.map((group: any, index: number) => (
            <div key={group._id} className="card" style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={{...styles.iconBox, backgroundColor: 'rgba(168, 160, 200, 0.1)', color: 'var(--color-accent-lavender)', position: 'relative'}}>
                  <span style={{ position: 'absolute', top: -8, left: -8, background: 'var(--color-accent-lavender)', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                    {index + 1}
                  </span>
                  <BookOpen size={32} />
                </div>
                <div style={styles.info}>
                  <h3 style={styles.name}>{group.bookDetails?.title || 'Unknown Title'}</h3>
                  <p style={styles.subInfo}>ISBN: {group._id} • {group.bookDetails?.author}</p>
                </div>
                <div style={styles.countBadge}>
                  <span style={styles.countNumber}>{group.count}</span>
                  <span style={styles.countLabel}>Requests</span>
                </div>
              </div>
              
              <div style={styles.actions}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleRejectClick(group)}
                >
                  <X size={16} /> Reject All
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleOrderClick(group)}
                >
                  <ShoppingCart size={16} /> Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {rejectModalOpen && (
        <div className="modal-overlay" onClick={() => setRejectModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Reject Requests</h3>
            <p style={styles.modalDesc}>Are you sure you want to dismiss {selectedGroup?.count} requests for this book?</p>
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitReject} disabled={rejectMutation.isPending} style={{ backgroundColor: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}>
                {rejectMutation.isPending ? 'Rejecting...' : 'Yes, Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject All Modal */}
      {rejectAllModalOpen && (
        <div className="modal-overlay" onClick={() => setRejectAllModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Reject All Requests</h3>
            <p style={styles.modalDesc}>Are you sure you want to dismiss ALL pending book requests? This action cannot be undone.</p>
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setRejectAllModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => rejectAllMutation.mutate()} disabled={rejectAllMutation.isPending} style={{ backgroundColor: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}>
                {rejectAllMutation.isPending ? 'Rejecting...' : 'Yes, Reject All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {orderModalOpen && (
        <div className="modal-overlay" onClick={() => setOrderModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Place Order</h3>
            <p style={styles.modalDesc}>How many copies of <strong>{selectedGroup?.bookDetails?.title || selectedGroup?._id}</strong> would you like to order from the publisher?</p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Copies</label>
              <input 
                className="input"
                type="number" 
                min={1}
                value={copiesOrdered}
                onChange={e => setCopiesOrdered(parseInt(e.target.value) || 1)}
              />
            </div>
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setOrderModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitOrder} disabled={orderMutation.isPending || copiesOrdered < 1}>
                {orderMutation.isPending ? 'Ordering...' : 'Confirm Order'}
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
    padding: '2rem 8rem 2rem 3rem',
    width: '100%',
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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
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
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflow: 'hidden',
    flex: 1,
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
  countBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg-base)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.5rem',
    minWidth: '60px',
  },
  countNumber: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--color-text-primary)',
    lineHeight: 1,
  },
  countLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    marginTop: '4px',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
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
    margin: '0 0 1.5rem 0',
    lineHeight: 1.4,
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  }
}
