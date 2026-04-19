import { NavLink } from 'react-router-dom'

import { useAppContext } from '../context/useAppContext'

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-pill-active' : 'nav-pill text-[var(--color-text-soft)]'

export function Header() {
  const { user, logout } = useAppContext()

  if (!user) {
    return null
  }

  return (
    <header
      className="surface-card px-5 py-4"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.84), rgba(248,244,237,0.92))',
      }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="kicker">ReactJS Web Projesi</p>
          <NavLink className="title-serif text-[2rem] leading-none" to="/home">
            PaperShelf
          </NavLink>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div
            className="rounded-md px-3 py-2 text-sm"
            style={{ background: 'var(--color-surface-soft)' }}
          >
            {user.fullName} olarak giris yapildi
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink className={navClass} to="/">
              Giris
            </NavLink>
            {user ? (
              <>
                <NavLink className={navClass} to="/home">
                  Ana Sayfa
                </NavLink>
                <NavLink className={navClass} to="/user">
                  Makalelerim
                </NavLink>
                <NavLink className={navClass} to="/user/new">
                  Makale Ekle
                </NavLink>
              </>
            ) : null}
            {user ? (
              <button
                className="btn-secondary !min-h-[42px] px-4 py-2"
                onClick={logout}
                type="button"
              >
                Cikis
              </button>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  )
}
