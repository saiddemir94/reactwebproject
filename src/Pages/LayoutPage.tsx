import { Outlet } from 'react-router-dom'

import { Header } from '../Components/Header'

export function LayoutPage() {
  return (
    <div className="min-h-screen px-4 py-5 md:px-6 md:py-8">
      <main className="mx-auto max-w-6xl">
        <div className="space-y-6">
          <Header />
          <Outlet />
        </div>
      </main>
    </div>
  )
}
