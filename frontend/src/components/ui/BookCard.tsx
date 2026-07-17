import React from 'react'
import { BookOpen, ShoppingCart } from '@phosphor-icons/react'

export interface Book {
  _id: string
  globalBookId: string
  title: string
  authors?: string[]
  category?: string[]
  coverImg?: string
  avl: number
  total: number
  expectedReturnDate?: string
}

interface BookCardProps {
  book: Book
  role: 'student' | 'employee' | 'public'
  onActionClick?: (book: Book) => void
  isActionDisabled?: boolean
  actionText?: string
}

export function BookCard({ book, role, onActionClick, isActionDisabled, actionText }: BookCardProps) {
  const isOutOfStock = book.avl <= 0

  return (
    <div className="card" style={styles.bookCard}>
      {book.coverImg ? (
        <img src={book.coverImg} alt={book.title} style={styles.bookCover} />
      ) : (
        <div style={styles.bookCoverPlaceholder}>
          <BookOpen size={32} color="var(--color-text-muted)" weight="light" />
        </div>
      )}
      <div style={styles.bookInfo}>
        <h3 style={styles.bookTitle}>{book.title}</h3>
        <p style={styles.bookAuthors}>{book.authors?.join(', ')}</p>
        
        <div style={styles.bookMeta}>
          {book.category?.map((cat: string) => (
            <span key={cat} className="badge badge-muted">{cat}</span>
          ))}
        </div>

        <div style={styles.bookFooter}>
          <div style={styles.statusGroup}>
            {role === 'student' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {isOutOfStock ? (
                  <span className="badge badge-rose">Out of Stock</span>
                ) : (
                  <span className="badge badge-seafoam">Available</span>
                )}
                {isOutOfStock && book.expectedReturnDate && (
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}>
                    Expected Return: {new Date(book.expectedReturnDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            ) : (
              isOutOfStock ? (
                <span className="badge badge-rose">Out of Stock</span>
              ) : (
                <span className="badge badge-seafoam">Available</span>
              )
            )}
            <span style={styles.copiesText}>{book.avl} / {book.total} copies</span>
          </div>

          {(role === 'employee' || (role === 'student' && isOutOfStock)) && onActionClick && (
            <button 
              className={role === 'employee' ? "btn btn-secondary" : "btn btn-primary"} 
              style={{ padding: '6px 12px', fontSize: role === 'student' ? '13px' : '12px' }}
              onClick={() => onActionClick(book)}
              disabled={isActionDisabled}
            >
              {role === 'employee' && <ShoppingCart size={14} style={{ marginRight: '4px' }} />} 
              {actionText || (role === 'employee' ? 'Order' : 'Request Book')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  bookCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    overflow: 'hidden',
    height: '100%',
  },
  bookCover: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderBottom: '1px solid var(--color-border)',
  },
  bookCoverPlaceholder: {
    width: '100%',
    height: '160px',
    backgroundColor: 'var(--color-bg-surface)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  bookTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: '0 0 0.25rem 0',
    lineHeight: 1.4,
  },
  bookAuthors: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: '0 0 1rem 0',
  },
  bookMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  bookFooter: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--color-border)',
  },
  statusGroup: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  copiesText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  }
}
