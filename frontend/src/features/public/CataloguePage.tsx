import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchBooks, getCategories } from '../../api'
import { ArrowLeft, MagnifyingGlass, BookOpen, WarningCircle } from '@phosphor-icons/react'

export default function CataloguePage() {
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

  const books = data?.data || []
  const categoriesList = ['', ...(catData?.data?.filter((c: string) => c) || [])]

  return (
    <div style={styles.page}>
      
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link to="/" style={styles.backLink}>
            <ArrowLeft size={14} />
            Library
          </Link>
          <span style={styles.headerDivider}>/</span>
          <span style={styles.headerTitle}>Catalogue</span>
        </div>
      </header>

      
      <main className="flex flex-col flex-1 w-full py-8 gap-8 items-start pb-24 pl-8 pr-24">
        
        {/* Horizontal Filters Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div className="flex flex-row overflow-x-auto gap-2 w-full md:w-auto flex-1 items-center pb-2 md:pb-0">
            <span style={{...styles.filterTitle, marginBottom: 0, marginRight: '0.5rem'}}>Categories:</span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  backgroundColor: category === cat ? 'var(--color-text-primary)' : 'transparent',
                  color: category === cat ? 'var(--color-bg-base)' : 'var(--color-text-secondary)',
                  fontWeight: category === cat ? 600 : 400,
                  whiteSpace: 'nowrap',
                  border: category === cat ? '1px solid var(--color-text-primary)' : '1px solid var(--color-border)'
                }}
              >
                {cat === '' ? 'All' : cat}
              </button>
            ))}
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
              {books.map((book: any) => (
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
                      {book.avl > 0 ? (
                        <span className="badge badge-seafoam">Available</span>
                      ) : (
                        <span className="badge badge-rose">Out of Stock</span>
                      )}
                      <span style={styles.copiesText}>{book.avl} / {book.total} copies</span>
                    </div>
                  </div>
                </div>
              ))}
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
    height: '64px',
    borderBottom: '1px solid var(--color-border)',
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
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 150ms ease',
  },
  headerDivider: {
    color: 'var(--color-border)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
  },
  headerTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-primary)',
    letterSpacing: '0.04em',
  },
  main: {
    display: 'flex',
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '2rem',
    gap: '3rem',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '240px',
    position: 'sticky',
    top: 'calc(64px + 2rem)',
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
  },
}
