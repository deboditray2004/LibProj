import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '../../api'
import { CheckCircle } from '@phosphor-icons/react'

const schema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>()
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data: FormData) => resetPassword(token!, data),
    onSuccess: () => {
      setSuccess(true)
      toast.success('Password updated successfully!')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reset password. Link may be invalid or expired.')
    }
  })

  const onSubmit = (data: FormData) => mutation.mutate(data)

  return (
    <div style={styles.page}>
      <div className="animate-in" style={styles.card}>
        <div style={styles.cardHeader}>
          <p style={styles.eyebrow}>Account Recovery</p>
          <h1 style={styles.title}>Reset Password</h1>
          <p style={styles.subtitle}>Enter your new password below.</p>
        </div>

        {success ? (
          <div style={styles.successState}>
            <CheckCircle size={48} color="var(--color-accent-seafoam)" weight="light" />
            <p style={{ margin: '1rem 0 0', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Password Reset
            </p>
            <p style={{ margin: '0.5rem 0 1.5rem', fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Your password has been successfully updated.
            </p>
            <Link to="/login/student" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
            <div style={styles.field}>
              <label htmlFor="password">New Password</label>
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

            <div style={styles.field}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Removed inline error block */}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={mutation.isPending}
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {mutation.isPending ? 'Resetting...' : 'Reset Password →'}
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
    color: 'var(--color-accent-lavender)',
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
