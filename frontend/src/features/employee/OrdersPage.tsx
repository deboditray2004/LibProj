import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getAllOrders, receiveOrder } from '../../api'
import { WarningCircle, Package, Check, Truck } from '@phosphor-icons/react'

export default function OrdersPage() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  })

  const receiveMutation = useMutation({
    mutationFn: receiveOrder,
    onSuccess: () => {
      toast.success('Order marked as received!')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to receive order.')
    }
  })

  const orders = data?.data || []

  const handleReceive = (id: string) => {
    receiveMutation.mutate(id)
  }

  if (isLoading) return <div style={styles.center}>Loading orders...</div>
  if (isError) return <div style={styles.center}><WarningCircle size={32} color="var(--color-accent-rose)" /><p>{(error as any)?.response?.data?.message || (error as Error)?.message}</p></div>

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Book Orders</h1>
        <p style={styles.subtitle}>Track and receive publisher orders.</p>
      </header>

      {orders.length === 0 ? (
        <div style={styles.emptyState}>No book orders found.</div>
      ) : (
        <div style={styles.timeline}>
          {orders.map((order: any) => {
            const isReceived = order.status === 'Received'
            
            return (
              <div key={order._id} className="card" style={{ ...styles.card, opacity: isReceived ? 0.6 : 1 }}>
                <div style={styles.cardHeader}>
                  <div style={{...styles.iconBox, backgroundColor: isReceived ? 'var(--color-bg-surface)' : 'rgba(196, 168, 90, 0.1)', color: isReceived ? 'var(--color-text-muted)' : 'var(--color-accent-amber)'}}>
                    {isReceived ? <Package size={24} /> : <Truck size={24} />}
                  </div>
                  <div style={styles.info}>
                    <h3 style={styles.name}>{order.orderTitle || 'Unknown Title'}</h3>
                    <p style={styles.subInfo}>ISBN: {order.globalBookId} • {order.copiesOrdered} copies ordered</p>
                  </div>
                  <div style={styles.statusBox}>
                    <span className={`badge ${isReceived ? 'badge-muted' : 'badge-amber'}`}>
                      {order.status}
                    </span>
                    <span style={styles.dateText}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {!isReceived && (
                  <div style={styles.actions}>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '13px', marginLeft: 'auto' }}
                      onClick={() => handleReceive(order._id)}
                      disabled={receiveMutation.isPending && receiveMutation.variables === order._id}
                    >
                      {(receiveMutation.isPending && receiveMutation.variables === order._id) ? 'Receiving...' : <><Check size={16} /> Mark as Received</>}
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem',
    maxWidth: '900px',
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
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
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
    padding: '1.25rem',
  },
  iconBox: {
    width: '40px',
    height: '40px',
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
    fontSize: '15px',
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
  statusBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
  dateText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
  },
  actions: {
    display: 'flex',
    padding: '1rem 1.25rem',
    borderTop: '1px dashed var(--color-border)',
    backgroundColor: 'var(--color-bg-base)',
  },
}
