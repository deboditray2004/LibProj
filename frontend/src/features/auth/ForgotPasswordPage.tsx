import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '../../api'
import { ArrowLeft, CheckCircle } from '@phosphor-icons/react'

const schema = z.object({
  email: z.string().email('Valid email is required'),
  role: z.enum(['student', 'employee']),
})
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'student' },
  })

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setSuccess(true)
      toast.success('Reset link sent!')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to send reset link.')
    }
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div style={styles.page}>
      
      <div className="animate-in" style={styles.backRow}>
        <Link to="/login/student" style={styles.backLink}>
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>

      
      <div className="animate-in" style={styles.card}>
        <div style={styles.cardHeader}>
          <p style={styles.eyebrow}>Account Recovery</p>
          <h1 style={styles.title}>Forgot password</h1>
          <p style={styles.subtitle}>
            Enter your email and role to receive a reset link.
          </p>
        </div>

        {success ? (
          <div style={styles.successState}>
            <CheckCircle size={48} color="var(--color-accent-seafoam)" weight="light" />
            <p style={{ margin: '1rem 0 0', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Check your email
            </p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              We've sent a password reset link to your email address. It will expire in 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
            <div style={styles.field}>
              <label>Select Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div style={styles.roleGroup}>
                    <button
                      type="button"
                      onClick={() => field.onChange('student')}
                      style={{
                        ...styles.roleBtn,
                        borderColor: field.value === 'student' ? 'var(--color-accent-lavender)' : 'var(--color-border)',
                        color: field.value === 'student' ? 'var(--color-accent-lavender)' : 'var(--color-text-secondary)',
                      }}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange('employee')}
                      style={{
                        ...styles.roleBtn,
                        borderColor: field.value === 'employee' ? 'var(--color-accent-seafoam)' : 'var(--color-border)',
                        color: field.value === 'employee' ? 'var(--color-accent-seafoam)' : 'var(--color-text-secondary)',
                      }}
                    >
                      Employee
                    </button>
                  </div>
                )}
              />
              {errors.role && <span className="field-error">{errors.role.message}</span>}
            </div>

            <div style={styles.field}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`input ${errors.email ? 'input-error' : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            

            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isPending}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {mutation.isPending ? 'Sending...' : 'Send Reset Link →'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-base)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative',
  },
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
    transition: 'color 150ms ease',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--color-bg-card)',
    border: '2px solid var(--color-border)',
    boxShadow: '4px 4px 0px 0px #111111',
    padding: '2.5rem',
  },
  cardHeader: {
    marginBottom: '2rem',
  },
  eyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-text-muted)',
    margin: '0 0 0.75rem 0',
  },
  title: {
    fontFamily: 'var(--font-sans)',
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: 'var(--color-text-primary)',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    lineHeight: 1.6,
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
  roleGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  roleBtn: {
    flex: 1,
    background: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  apiError: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'var(--color-accent-rose-dim)',
    border: '1px solid var(--color-accent-rose)',
    borderRadius: 'var(--radius-sm)',
    padding: '10px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--color-accent-rose)',
  },
  successState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0',
  },
}
