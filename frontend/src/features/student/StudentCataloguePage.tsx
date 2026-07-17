import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { searchBooks, getCategories, requestBook } from '../../api'
import { BookCard } from '../../components/ui/BookCard'
import { CategoryDropdown } from '../../components/ui/CategoryDropdown'
import { MagnifyingGlass, WarningCircle } from '@phosphor-icons/react'
import { sharedStyles } from '../../styles/shared'

export default function StudentCataloguePage() {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [extModalOpen, setExtModalOpen] = useState(false)
  const [extIsbn, setExtIsbn] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', search, categories],
    queryFn: () => searchBooks({ search, category: categories.join(',') }),
  })

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const requestMutation = useMutation({
    mutationFn: (isbn: string) => requestBook({ isbn }),
    onSuccess: () => {
      toast.success('Book requested successfully!')
      setExtModalOpen(false)
      setExtIsbn('')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to request book.')
    }
  })

  const submitExtOrder = () => {
    if (!extIsbn) return
    requestMutation.mutate(extIsbn)
  }

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
          <div className="flex flex-row items-center gap-4 w-full md:w-auto flex-1 pb-2 md:pb-0">
            <button 
              className="btn btn-primary flex-shrink-0"
              onClick={() => setExtModalOpen(true)}
            >
              New Book
            </button>
            
            <CategoryDropdown 
              categoriesList={categoriesList}
              selectedCategories={categories}
              onChange={setCategories}
            />
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
                <BookCard 
                  key={book._id || book.globalBookId} 
                  book={book} 
                  role="student" 
                  onActionClick={() => requestMutation.mutate(book.globalBookId)} 
                  isActionDisabled={requestMutation.isPending && requestMutation.variables === book.globalBookId}
                  actionText={(requestMutation.isPending && requestMutation.variables === book.globalBookId) ? 'Requesting...' : 'Request Book'}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {extModalOpen && (
        <div className="modal-overlay" onClick={() => setExtModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Request External Book</h3>
            <p style={styles.modalDesc}>Enter the ISBN (e.g., Google Books ID) of the book you want the library to add.</p>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>ISBN / Book ID</label>
              <input 
                className="input"
                type="text" 
                value={extIsbn}
                onChange={e => setExtIsbn(e.target.value)}
                placeholder="e.g., 9780132350884"
              />
            </div>
            <div style={styles.modalActions}>
              <button className="btn btn-secondary" onClick={() => setExtModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitExtOrder} disabled={requestMutation.isPending || !extIsbn}>
                {requestMutation.isPending ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  ...sharedStyles,
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },
}
