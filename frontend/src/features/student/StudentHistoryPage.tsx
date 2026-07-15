import { useQuery } from '@tanstack/react-query'
import { getTransactionHistory } from '../../api'
import { WarningCircle } from '@phosphor-icons/react'

export default function StudentHistoryPage() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['studentTransactions'],
    queryFn: getTransactionHistory,
  })

  // Only show returned books in history
  const transactions = (data?.data || []).filter((txn: any) => !!txn.rtrnDate)

  if (isLoading) {
    return <div style={styles.stateCenter}>Loading history...</div>
  }

  if (isError) {
    return (
      <div style={styles.stateCenter}>
        <WarningCircle size={32} color="var(--color-accent-rose)" />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Failed to load transactions.</p>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>History</h1>
        <p style={styles.subtitle}>View your past borrowed books.</p>
      </header>

      {transactions.length === 0 ? (
        <div style={styles.stateCenter}>
          <p style={{ color: 'var(--color-text-secondary)' }}>You have no transaction history.</p>
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Book Title</th>
                <th style={styles.th}>Borrow Date</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Return Date</th>
                <th style={styles.th}>Fine</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn: any) => {
                return (
                  <tr key={txn._id} style={styles.tr}>
                    <td style={styles.td}>
                      <span style={styles.bookTitle}>{txn.b_id?.title || 'Unknown Book'}</span>
                    </td>
                    <td style={styles.td}>{new Date(txn.borrowDate).toLocaleDateString()}</td>
                    <td style={styles.td}>
                      {new Date(txn.dueDate).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      {new Date(txn.rtrnDate).toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      ₹{txn.frozenFine}
                    </td>
                    <td style={styles.td}>
                      <span className="badge badge-muted">Returned</span>
                    </td>
                    <td style={styles.td}>
                      {/* No actions for returned books currently */}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '2rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    maxWidth: '1200px',
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
  stateCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
  },
  tableContainer: {
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '1rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    borderBottom: '1px solid var(--color-border)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tr: {
    borderBottom: '1px solid var(--color-border)',
    transition: 'background-color 150ms ease',
  },
  td: {
    padding: '1rem',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    verticalAlign: 'middle',
  },
  bookTitle: {
    color: 'var(--color-text-primary)',
    fontWeight: 500,
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: 'rgba(239, 137, 137, 0.1)',
    color: 'var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: 'rgba(163, 230, 210, 0.1)',
    color: 'var(--color-accent-seafoam)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
  },
}
