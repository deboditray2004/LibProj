import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Student, IdentificationBadge, Books } from '@phosphor-icons/react'

const cards = [
  {
    id: 'student',
    label: 'Student',
    description: 'Access your dashboard, borrow books, track fines, and manage your profile.',
    icon: Student,
    accent: 'var(--color-accent-lavender)',
    accentDim: 'var(--color-accent-lavender-dim)',
    href: '/login/student',
  },
  {
    id: 'employee',
    label: 'Employee',
    description: 'Manage approvals, desk operations, inventory orders, and student records.',
    icon: IdentificationBadge,
    accent: 'var(--color-accent-seafoam)',
    accentDim: 'var(--color-accent-seafoam-dim)',
    href: '/login/employee',
  },
  {
    id: 'catalogue',
    label: 'Browse Catalogue',
    description: 'Explore the full book collection. No account required.',
    icon: Books,
    accent: 'var(--color-accent-amber)',
    accentDim: 'var(--color-accent-amber-dim)',
    href: '/catalogue',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        {/* Eyebrow label */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '1rem',
          }}
        >
          Library Management System
        </p>

        {/* Main title */}
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'var(--color-text-primary)',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Library
        </h1>

        {/* Thin rule below title */}
        <div
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--color-border)',
            margin: '1.5rem auto 0',
          }}
        />
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          width: '100%',
          maxWidth: '860px',
          backgroundColor: 'var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <motion.button
              key={card.id}
              variants={item}
              onClick={() => navigate(card.href)}
              whileHover={{ backgroundColor: card.accentDim }}
              transition={{ duration: 0.15 }}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: 'none',
                padding: '2.5rem 2rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'background-color 200ms ease',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: card.accentDim,
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <Icon size={20} color={card.accent} weight="light" />
              </div>

              {/* Label */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                {card.label}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {card.description}
              </p>

              {/* Arrow */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: card.accent,
                  marginTop: 'auto',
                  paddingTop: '0.5rem',
                }}
              >
                Enter →
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-dim)',
          marginTop: '3rem',
          letterSpacing: '0.06em',
        }}
      >
        v1.0 · Enterprise Library Management
      </motion.p>
    </div>
  )
}
