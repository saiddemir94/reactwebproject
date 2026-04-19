export interface User {
  id: string
  fullName: string
  email: string
  institution: string
  role: string
  password: string
}

export interface RegisterFormValues {
  fullName: string
  email: string
  institution: string
  role: string
  password: string
}
