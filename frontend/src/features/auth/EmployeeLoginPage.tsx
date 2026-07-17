import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { employeeLogin } from '../../api'
import { ArrowLeft } from '@phosphor-icons/react'
import { sharedStyles } from '../../styles/shared'

const schema = z.object({
  empId: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(1, 'Password is required'),
})
type FormData = z.infer<typeof schema>

export default function EmployeeLoginPage() {
  const navigate = useNavigate()
  const { dispatch } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: employeeLogin,
    onSuccess: (data) => {
      dispatch({
        type: 'LOGIN',
        payload: { ...(data.data.employee || data.data), role: 'employee' },
      })
      toast.success('Login successful!')
      navigate('/employee/dashboard')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.')
    }
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div style={styles.page}>
      
      <div className="animate-in" style={styles.backRow}>
        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={14} />
          Library
        </Link>
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        style={styles.card}
      >
        
        <div style={styles.cardHeader}>
          <p style={styles.eyebrow}>Employee Portal</p>
          <h1 style={styles.title}>Sign in</h1>
          <p style={styles.subtitle}>Enter your employee ID and password.</p>
        </div>

        
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
          <div style={styles.field}>
            <label htmlFor="empId">Employee ID</label>
            <input
              id="empId"
              type="text"
              placeholder="e.g. 1001"
              className={`input ${errors.empId ? 'input-error' : ''}`}
              {...register('empId')}
            />
            {errors.empId && (
              <span className="field-error">{errors.empId.message}</span>
            )}
          </div>

          <div style={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`input ${errors.password ? 'input-error' : ''}`}
              {...register('password')}
            />
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </div>

          

          <button
            type="submit"
            className="btn btn-primary"
            disabled={mutation.isPending}
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            {mutation.isPending ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        
        <div style={styles.footerLinks}>
          <Link to="/forgot-password" style={styles.link}>
            Forgot password?
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  ...sharedStyles,
  backRow: {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
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
  },
  cardHeader: {
    marginBottom: '2rem',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-accent-seafoam)',
    margin: '0 0 0.75rem 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },

  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.75rem',
  },
  link: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textDecoration: 'none',
    letterSpacing: '0.02em',
  },
}
