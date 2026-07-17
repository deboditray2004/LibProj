import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { registerStudent } from '../../api'
import { ArrowLeft, CheckCircle, UploadSimple } from '@phosphor-icons/react'

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  department: z.string().min(2, 'Department is required'),
  rollNo: z.string().min(1, 'Roll No is required'),
  dob: z.string().min(1, 'Date of Birth is required'),
  addr: z.string().min(5, 'Address must be at least 5 characters'),
  govtId: z
    .any()
    .refine((files) => files?.length == 1, 'Govt ID is required.')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data: globalThis.FormData) => registerStudent(data),
    onSuccess: () => {
      setSuccess(true)
      toast.success('Registration submitted!')
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  })

  const onSubmit = (data: FormData) => {
    const formData = new globalThis.FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('dept', data.department)
    formData.append('rollNo', data.rollNo)
    formData.append('dob', data.dob)
    formData.append('addr', data.addr)
    formData.append('govtId', data.govtId[0])
    mutation.mutate(formData)
  }

  const handleNextStep = async () => {
    const isStep1Valid = await trigger(['name', 'email', 'password', 'department', 'rollNo', 'dob', 'addr'])
    if (isStep1Valid) {
      setStep(2)
    }
  }

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
          <p style={styles.eyebrow}>Student Portal</p>
          <h1 style={styles.title}>Register</h1>
          <p style={styles.subtitle}>Apply for a library account.</p>
        </div>

        {success ? (
          <div style={styles.successState}>
            <CheckCircle size={48} color="var(--color-accent-seafoam)" weight="light" />
            <p style={{ margin: '1rem 0 0', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Application Submitted
            </p>
            <p style={{ margin: '0.5rem 0 1.5rem', fontSize: '13px', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
              Your application is pending review. You will receive an email with your Library Card Number once approved.
            </p>
            <Link to="/" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Return Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} style={styles.form} noValidate>
            
            
            <div style={{ display: step === 1 ? 'flex' : 'none', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={styles.field}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={`input ${errors.name ? 'input-error' : ''}`}
                  {...register('name')}
                />
                {errors.name && <span className="field-error">{errors.name.message}</span>}
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
                {errors.email && <span className="field-error">{errors.email.message}</span>}
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
                {errors.password && <span className="field-error">{errors.password.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="department">Department / Major</label>
                <input
                  id="department"
                  type="text"
                  placeholder="Computer Science"
                  className={`input ${errors.department ? 'input-error' : ''}`}
                  {...register('department')}
                />
                {errors.department && <span className="field-error">{errors.department.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="rollNo">Roll Number</label>
                <input
                  id="rollNo"
                  type="number"
                  placeholder="101"
                  className={`input ${errors.rollNo ? 'input-error' : ''}`}
                  {...register('rollNo')}
                />
                {errors.rollNo && <span className="field-error">{errors.rollNo.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  className={`input ${errors.dob ? 'input-error' : ''}`}
                  {...register('dob')}
                />
                {errors.dob && <span className="field-error">{errors.dob.message}</span>}
              </div>

              <div style={styles.field}>
                <label htmlFor="addr">Address</label>
                <textarea
                  id="addr"
                  placeholder="123 College St"
                  className={`input ${errors.addr ? 'input-error' : ''}`}
                  style={{ minHeight: '60px', resize: 'vertical' }}
                  {...register('addr')}
                />
                {errors.addr && <span className="field-error">{errors.addr.message}</span>}
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextStep}
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                Continue →
              </button>
            </div>

            
            <div style={{ display: step === 2 ? 'flex' : 'none', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={styles.field}>
                <label>Government ID (Proof of Identity)</label>
                <div style={styles.fileUpload}>
                  <UploadSimple size={20} color="var(--color-text-muted)" />
                  <input
                    type="file"
                    accept="image/*"
                    {...register('govtId')}
                    style={styles.fileInput}
                  />
                </div>
                {errors.govtId && <span className="field-error">{errors.govtId?.message as string}</span>}
              </div>

              

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={mutation.isPending}
                  style={{ flex: 2, justifyContent: 'center' }}
                >
                  {mutation.isPending ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>

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
    maxWidth: '480px',
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
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
  },
  fileUpload: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: 'var(--color-bg-surface)',
    border: '1px dashed var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
  },
  fileInput: {
    width: '100%',
    cursor: 'pointer',
    color: 'var(--color-text-primary)',
    background: 'transparent',
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
