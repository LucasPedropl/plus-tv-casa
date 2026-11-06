import { createContext, useContext, useState, type ReactNode } from 'react'

export interface SignUpOptions {
  tvCount?: number
}

interface SignUpModalContextValue {
  isOpen: boolean
  initialTvCount?: number
  openSignUp: (options?: SignUpOptions) => void
  closeSignUp: () => void
}

const SignUpModalContext = createContext<SignUpModalContextValue | null>(null)

export function SignUpModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialTvCount, setInitialTvCount] = useState<number | undefined>(undefined)

  const openSignUp = (options?: SignUpOptions) => {
    setInitialTvCount(options?.tvCount)
    setIsOpen(true)
  }

  const closeSignUp = () => {
    setIsOpen(false)
    setInitialTvCount(undefined)
  }

  return (
    <SignUpModalContext.Provider value={{ isOpen, initialTvCount, openSignUp, closeSignUp }}>
      {children}
    </SignUpModalContext.Provider>
  )
}

export function useSignUpModal() {
  const ctx = useContext(SignUpModalContext)
  if (!ctx) {
    throw new Error('useSignUpModal must be used within SignUpModalProvider')
  }
  return ctx
}
