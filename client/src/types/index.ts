export type RegisterType = {
    userName: string
    email: string
    password: string
}

export type LoginType = {
    email: string
    password: string
}

export type User = {
    userName: string
    email: string
    avatar?: string
    isVerified?: string
    isCreatedAt?: string
}

export type AuthStore = {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean | null
    error: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    fetchUser: () => Promise<void>
}