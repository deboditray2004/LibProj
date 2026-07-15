export type Role = 'student' | 'employee'

export interface AuthUser {
  _id: string
  name?: string
  cardNo?: number
  empId?: number
  email?: string
  role: Role
}
