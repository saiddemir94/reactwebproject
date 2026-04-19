import { Navigate } from 'react-router-dom'

import { AuthPanel } from '../Components/AuthPanel'
import { useAppContext } from '../context/useAppContext'

export function LoginPage() {
  const { user } = useAppContext()

  if (user) {
    return <Navigate replace to="/home" />
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl items-center">
      <div className="w-full">
        <div className="mb-5 text-center">
          <p className="kicker">PaperShelf</p>
          <h1 className="title-serif mt-3 text-5xl leading-none">Giris Yap</h1>
        </div>

        <AuthPanel />
      </div>
    </section>
  )
}
