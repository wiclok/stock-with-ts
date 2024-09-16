import bcrypt from 'bcrypt'

export const comparePassword = async (password: string, hashedPassword: string) => {
    const isValidPassword = await bcrypt.compare(password, hashedPassword)
    return isValidPassword
}
