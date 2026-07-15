import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { searchBooks, getCategories, requestBook } from '../../api'
import { MagnifyingGlass, BookOpen, WarningCircle, CheckCircle } from '@phosphor-icons/react'

export default function StudentCataloguePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', search, category],
    queryFn: () => searchBooks({ search, category }),
  })

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const requestMutation = useMutation({
    mutationFn: (isbn: string) => requestBook({ isbn }),
  })

  // Ensure books is always an array. API error 404 is thrown if empty.
  const books = data?.data || []
  // Filter out empty strings from categories list and prepend '' (All Categories)
  const categoriesList = ['', ...(catData?.data?.filter((c: string) => c) || [])]

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Library Catalogue</h1>
        <p style={styles.subtitle}>Browse and request books.</p>
      </header>

      <div style={styles.main}>
        {/* Sidebar / Filters */}
        <aside style={styles.sidebar}>
          <div style={styles.searchBox}>
            <MagnifyingGlass size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: 12, top: 12 }} />
            <input
              type="text"
              placeholder="Search title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <p style={styles.filterTitle}>Category</p>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  color: category === cat ? 'var(--color-accent-lavender)' : 'var(--color-text-secondary)',
                  fontWeight: category === cat ? 600 : 400,
                }}
              >
                {cat === '' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <section style={styles.content}>
          {isLoading ? (
            <div style={styles.stateCenter}>Loading...</div>
          ) : isError || books.length === 0 ? (
            <div style={styles.stateCenter}>
              <WarningCircle size={32} color="var(--color-text-muted)" weight="light" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>No books found.</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {books.map((book: any) => {
                const isOutOfStock = book.avl === 0
                return (
                  <div key={book._id} className="card" style={styles.bookCard}>
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
                        <div>
                          {isOutOfStock ? (
                            <span className="badge badge-rose">Out of Stock</span>
                          ) : (
                            <span className="badge badge-seafoam">Available</span>
                          )}
                          <span style={styles.copiesText}>{book.avl} / {book.total} copies</span>
                        </div>
                        
                        {isOutOfStock && (
                          <button
                            className="btn btn-primary"
                            style={{ padding: '6px 12px', fontSize: '13px' }}
                            onClick={() => requestMutation.mutate(book.globalBookId)}
                            disabled={requestMutation.isPending && requestMutation.variables === book.globalBookId}
                          >
                            {(requestMutation.isPending && requestMutation.variables === book.globalBookId) ? 'Requesting...' : 'Request Book'}
                          </button>
                        )}
                      </div>

                      {/* inline feedback for request */}
                      {requestMutation.isSuccess && requestMutation.variables === book.globalBookId && (
                        <div style={styles.successMsg}>
                          <CheckCircle size={14} /> Request sent!
                        </div>
                      )}
                      {requestMutation.isError && requestMutation.variables === book.globalBookId && (
                        <div style={styles.errorMsg}>
                          <WarningCircle size={14} /> Failed to request.
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
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
  main: {
    display: 'flex',
    flex: 1,
    gap: '3rem',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '240px',
    position: 'sticky',
    top: '2rem',
  },
  searchBox: {
    position: 'relative',
    marginBottom: '2rem',
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    padding: '10px 14px 10px 36px',
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  filterTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '0.5rem',
  },
  filterBtn: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '6px 0',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'color 150ms ease',
  },
  content: {
    flex: 1,
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  bookCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    overflow: 'hidden',
    height: '100%',
  },
  bookCover: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderBottom: '1px solid var(--color-border)',
  },
  bookCoverPlaceholder: {
    width: '100%',
    height: '180px',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '1rem',
    borderTop: '1px solid var(--color-border)',
  },
  copiesText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    display: 'block',
    marginTop: '4px',
  },
  successMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: 'var(--color-accent-seafoam)',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    marginTop: '0.75rem',
    justifyContent: 'flex-end',
  },
  errorMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: 'var(--color-accent-rose)',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    marginTop: '0.75rem',
    justifyContent: 'flex-end',
  },
}
