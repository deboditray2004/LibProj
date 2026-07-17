import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { BookCard } from '../../components/ui/BookCard'
import { searchBooks, getCategories, manualOrder } from '../../api'
import { MagnifyingGlass, WarningCircle, CaretLeft, CaretRight } from '@phosphor-icons/react'
import Modal from '../../components/ui/Modal'
import { sharedStyles } from '../../styles/shared'

export default function EmployeeCataloguePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
    }
  }
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [copiesOrdered, setCopiesOrdered] = useState(1)

  const [extModalOpen, setExtModalOpen] = useState(false)
  const [extIsbn, setExtIsbn] = useState('')
  const [extCopies, setExtCopies] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', search, category],
    queryFn: () => searchBooks({ search, category }),
  })

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const orderMutation = useMutation({
    mutationFn: manualOrder,
    onSuccess: () => {
      toast.success('Order placed successfully!')
      queryClient.invalidateQueries({ queryKey: ['books'] })
      setOrderModalOpen(false)
      setCopiesOrdered(1)
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to place order.')
    }
  })

  const books = data?.data || []
  const categoriesList = ['', ...(catData?.data?.filter((c: string) => c) || [])]

  const handleOrderClick = (book: any) => {
    setSelectedBook(book)
    setCopiesOrdered(1)
    setOrderModalOpen(true)
  }

  const submitOrder = () => {
    if (selectedBook && copiesOrdered > 0) {
      orderMutation.mutate({
        isbn: selectedBook.globalBookId,
        copiesOrdered
      })
    }
  }

  const submitExtOrder = () => {
    if (extIsbn && extCopies > 0) {
      orderMutation.mutate({
        isbn: extIsbn,
        copiesOrdered: extCopies
      })
      setExtModalOpen(false)
      setExtIsbn('')
      setExtCopies(1)
    }
  }

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
            <button 
              className="btn btn-primary flex-shrink-0 mr-4"
              onClick={() => setExtModalOpen(true)}
            >
              New Book
            </button>

            
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
              {books.map((book: any) => (
                <BookCard 
                  key={book._id || book.globalBookId} 
                  book={book} 
                  role="employee" 
                  onActionClick={handleOrderClick} 
                />
              ))}
            </div>
          )}
        </section>
      </main>

      
      <Modal isOpen={extModalOpen} onClose={() => setExtModalOpen(false)}>
        <h3 style={styles.modalTitle}>New Book</h3>
        <p style={styles.modalDesc}>Enter the ISBN (e.g., Google Books ID) to procure a new book.</p>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>ISBN / Book ID</label>
          <input 
            className="input"
            type="text" 
            value={extIsbn}
            onChange={e => setExtIsbn(e.target.value)}
            placeholder="e.g., 9780132350884"
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Copies</label>
          <input 
            className="input"
            type="number" 
            min={1}
            value={extCopies}
            onChange={e => setExtCopies(parseInt(e.target.value) || 1)}
          />
        </div>
        <div style={styles.modalActions}>
          <button className="btn btn-secondary" onClick={() => setExtModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={submitExtOrder} disabled={orderMutation.isPending || extCopies < 1 || !extIsbn}>
            {orderMutation.isPending ? 'Ordering...' : 'Confirm Order'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={orderModalOpen} onClose={() => setOrderModalOpen(false)}>
        <h3 style={styles.modalTitle}>Order Book</h3>
        <p style={styles.modalDesc}>How many copies of <strong>{selectedBook?.title}</strong> would you like to order from the publisher?</p>
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
      </Modal>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
  },

  /* Removed unused input styles */
}
