import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { searchBooks, getCategories, requestBook } from '../../api'
import { MagnifyingGlass, BookOpen, WarningCircle, CaretLeft, CaretRight } from '@phosphor-icons/react'

export default function StudentCataloguePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
    }
  }
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
    onSuccess: () => {
      toast.success('Book requested successfully!')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to request book.')
    }
  })

  const books = data?.data || []
  const categoriesList = ['', ...(catData?.data?.filter((c: string) => c) || [])]

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>Library Catalogue</h1>
        </div>
      </header>

      <main className="flex flex-col flex-1 w-full py-8 gap-8 items-start pl-8 pr-32">
        
        {/* Horizontal Filters Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="flex flex-row items-center gap-2 w-full md:w-auto flex-1 min-w-0 pb-2 md:pb-0">
            <span style={{...styles.filterTitle, marginBottom: 0, marginRight: '0.5rem', flexShrink: 0}}>Categories:</span>
            
            <button onClick={() => scroll('left')} className="p-1 hover:bg-[var(--color-bg-surface)] rounded-full text-[var(--color-text-secondary)] transition-colors flex-shrink-0">
              <CaretLeft size={20} weight="bold" />
            </button>
            
            <div ref={scrollContainerRef} className="flex flex-row overflow-x-auto gap-2 items-center flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: category === cat ? 'var(--color-bg-surface)' : 'transparent',
                  color: category === cat ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontWeight: category === cat ? 600 : 400,
                  whiteSpace: 'nowrap',
                  border: category === cat ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)'
                }}
              >
                {cat === '' ? 'All' : cat}
              </button>
              ))}
            </div>

            <button onClick={() => scroll('right')} className="p-1 hover:bg-[var(--color-bg-surface)] rounded-full text-[var(--color-text-secondary)] transition-colors flex-shrink-0">
              <CaretRight size={20} weight="bold" />
            </button>
          </div>

          <div style={{ ...styles.searchBox, marginBottom: 0 }} className="w-full md:w-[300px] flex-shrink-0">
            <MagnifyingGlass size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: 12, top: 10 }} />
            <input
              type="text"
              placeholder="Search title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <section style={styles.content} className="w-full">
          {isLoading ? (
            <div style={styles.stateCenter}>Loading...</div>
          ) : isError || books.length === 0 ? (
            <div style={styles.stateCenter}>
              <WarningCircle size={32} color="var(--color-text-muted)" weight="light" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>No books found.</p>
            </div>
          ) : (
            <div className="w-full" style={styles.grid}>
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span className="badge badge-rose">Out of Stock</span>
                              {book.expectedReturnDate && (
                                <span style={styles.copiesText}>
                                  Expected Return: {new Date(book.expectedReturnDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
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

                      
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '80px',
    borderBottom: '2px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2rem',
    backgroundColor: 'var(--color-bg-base)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  headerTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--color-text-primary)',
    margin: 0,
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
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
}
