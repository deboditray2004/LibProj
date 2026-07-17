import React, { useState, useRef, useEffect } from 'react'
import { CaretDown, Check } from '@phosphor-icons/react'

interface CategoryDropdownProps {
  categoriesList: string[]
  selectedCategories: string[]
  onChange: (cats: string[]) => void
}

export function CategoryDropdown({ categoriesList, selectedCategories, onChange }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      onChange(selectedCategories.filter(c => c !== cat))
    } else {
      onChange([...selectedCategories, cat])
    }
  }

  const validCategories = categoriesList.filter(c => c !== '')

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors min-w-[200px]"
      >
        <span className="truncate">
          {selectedCategories.length === 0 
            ? 'All Categories' 
            : `${selectedCategories.length} Selected`}
        </span>
        <CaretDown size={16} weight="bold" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 max-h-80 overflow-y-auto bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-md shadow-xl z-50 py-1">
          {validCategories.map(cat => {
            const isSelected = selectedCategories.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-[var(--color-bg-background)] text-left transition-colors"
              >
                <span style={{ color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: isSelected ? 600 : 400 }}>
                  {cat}
                </span>
                {isSelected && <Check size={16} weight="bold" color="var(--color-text-primary)" />}
              </button>
            )
          })}
          {validCategories.length === 0 && (
            <div className="px-4 py-2 text-[var(--color-text-muted)]">No categories available</div>
          )}
        </div>
      )}
    </div>
  )
}
