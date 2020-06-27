export interface UserModel {
  id?: number
  name: string
  email: string
  remember?: boolean
  password?: string
  '2fa'?: boolean
  passcode?: string
}
