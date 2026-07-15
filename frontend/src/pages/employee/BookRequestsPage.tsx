import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAggregatedRequests, placeOrder, rejectBookRequest } from '../../api'
import { WarningCircle, BookOpen, X, ShoppingCart } from '@phosphor-icons/react'

export default function BookRequestsPage() {
  const queryClient = useQueryClient()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  
  const [selectedGroup, setSelectedGroup] = useState<any>(null)
  
  // For Order
  const [copiesOrdered, setCopiesOrdered] = useState(1)
  
  // For Reject (backend takes requestIds array, but doesn't take a reason string currently)
  // Let's just pass the requestIds.

  const { data, isLoading, isError } = useQuery({
    queryKey: ['aggregatedRequests'],
    queryFn: getAggregatedRequests,
  })

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aggregatedRequests'] })
      setOrderModalOpen(false)
      setCopiesOrdered(1)
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectBookRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aggregatedRequests'] })
      setRejectModalOpen(false)
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
        copiesOrdered,
        requestIds: selectedGroup.requestIds
      })
    }
  }

  const submitReject = () => {
    if (selectedGroup) {
      rejectMutation.mutate({
        requestIds: selectedGroup.requestIds
      })
    }
  }

  if (isLoading) return <div style={styles.center}>Loading book requests...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Book Requests</h1>
        <p style={styles.subtitle}>Aggregated student requests for out-of-stock books.</p>
      </header>

      {requestGroups.length === 0 ? (
        <div style={styles.emptyState}>No pending book requests at the moment.</div>
      ) : (
        <div style={styles.list}>
          {requestGroups.map((group: any) => (
            <div key={group._id} className="card" style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={{...styles.iconBox, backgroundColor: 'rgba(168, 160, 200, 0.1)', color: 'var(--color-accent-lavender)'}}>
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

      {/* Order Modal */}
      {orderModalOpen && selectedGroup && (
        <div style={styles.modalOverlay}>
          <div className="card" style={styles.modal}>
            <h3 style={styles.modalTitle}>Place Book Order</h3>
            <p style={styles.modalDesc}>How many copies of <strong>{selectedGroup.bookDetails?.title}</strong> would you like to order from the publisher?</p>
            
            <div style={styles.field}>
              <label style={styles.label}>Copies to Order</label>
              <input 
                type="number" 
                min="1" 
                style={styles.input}
                value={copiesOrdered}
                onChange={(e) => setCopiesOrdered(parseInt(e.target.value) || 1)}
              />
            </div>

            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setOrderModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitOrder} disabled={orderMutation.isPending}>
                {orderMutation.isPending ? 'Ordering...' : 'Confirm Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalOpen && selectedGroup && (
        <div style={styles.modalOverlay}>
          <div className="card" style={styles.modal}>
            <h3 style={styles.modalTitle}>Reject Requests</h3>
            <p style={styles.modalDesc}>Are you sure you want to reject all <strong>{selectedGroup.count}</strong> requests for <strong>{selectedGroup.bookDetails?.title}</strong>? This cannot be undone.</p>
            
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setRejectModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitReject} disabled={rejectMutation.isPending} style={{ backgroundColor: 'var(--color-accent-rose)', borderColor: 'var(--color-accent-rose)' }}>
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
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
  },
  card: {
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
    margin: '0 0 1.5rem 0',
    lineHeight: 1.4,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
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
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
  }
}
