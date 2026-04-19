import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppContext } from '../context/useAppContext'

type Mode = 'login' | 'register'

export function AuthPanel() {
  const navigate = useNavigate()
  const { login, logout, register, user } = useAppContext()
  const [mode, setMode] = useState<Mode>('login')
  const [message, setMessage] = useState('')
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  })
  const [registerValues, setRegisterValues] = useState({
    fullName: '',
    email: '',
    institution: '',
    role: '',
    password: '',
  })

  if (user) {
    return (
      <div className="surface-card p-5">
        <p className="kicker">Oturum Acik</p>
        <h2 className="title-serif mt-3 text-3xl">{user.fullName}</h2>
        <p className="text-soft mt-2 text-sm">{user.institution}</p>
        <p className="text-muted mt-1 text-sm">{user.role}</p>
        <div className="mt-5 flex flex-col gap-3">
          <Link className="btn-primary w-full" to="/home">
            Anasayfaya Git
          </Link>
          <button className="btn-secondary w-full" onClick={logout} type="button">
            Cikis Yap
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="surface-card overflow-hidden p-0">
      <div
        className="border-b px-5 py-4"
        style={{
          borderColor: 'var(--color-border)',
          background: 'linear-gradient(135deg, rgba(248,244,237,0.92), rgba(255,253,249,0.96))',
        }}
      >
        <p className="kicker">PaperShelf</p>
        <h2 className="title-serif mt-3 text-3xl">Hesabina giris yap</h2>
      </div>

      <div className="p-5">
        <div
          className="grid grid-cols-2 gap-2 rounded-md border p-1"
          style={{
            borderColor: 'var(--color-border)',
            background: 'var(--color-surface-soft)',
          }}
        >
          <button
            className={mode === 'login' ? 'tab-button-active flex-1' : 'tab-button flex-1'}
            onClick={() => setMode('login')}
            type="button"
          >
            Giris Yap
          </button>
          <button
            className={mode === 'register' ? 'tab-button-active flex-1' : 'tab-button flex-1'}
            onClick={() => setMode('register')}
            type="button"
          >
            Kayit
          </button>
        </div>

        {mode === 'login' ? (
          <form
            className="mt-5 space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              const result = login(loginValues.email, loginValues.password)
              setMessage(result.message)
              if (result.ok) {
                navigate('/home')
              }
            }}
          >
            <div>
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Kullanici Girisi
              </p>
              <h2 className="title-serif mt-2 text-3xl">
                Makalelerine erismek icin giris yap
              </h2>
            </div>
            <input
              className="field-input"
              onChange={(event) =>
                setLoginValues((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="E-posta"
              type="email"
              value={loginValues.email}
            />
            <input
              className="field-input"
              onChange={(event) =>
                setLoginValues((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder="Sifre"
              type="password"
              value={loginValues.password}
            />
            <button className="btn-primary w-full" type="submit">
              Giris Yap
            </button>
          </form>
        ) : (
          <form
            className="mt-5 space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              const result = register(registerValues)
              setMessage(result.message)
              if (result.ok) {
                navigate('/home')
              }
            }}
          >
            <div>
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Kayit Ol
              </p>
              <h2 className="title-serif mt-2 text-3xl">
                Yeni bir yazar hesabi olustur
              </h2>
            </div>
            <input
              className="field-input"
              onChange={(event) =>
                setRegisterValues((current) => ({
                  ...current,
                  fullName: event.target.value,
                }))
              }
              placeholder="Ad soyad"
              required
              value={registerValues.fullName}
            />
            <input
              className="field-input"
              onChange={(event) =>
                setRegisterValues((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="E-posta"
              required
              type="email"
              value={registerValues.email}
            />
            <input
              className="field-input"
              onChange={(event) =>
                setRegisterValues((current) => ({
                  ...current,
                  institution: event.target.value,
                }))
              }
              placeholder="Kurum"
              required
              value={registerValues.institution}
            />
            <input
              className="field-input"
              onChange={(event) =>
                setRegisterValues((current) => ({
                  ...current,
                  role: event.target.value,
                }))
              }
              placeholder="Rol"
              required
              value={registerValues.role}
            />
            <input
              className="field-input"
              minLength={6}
              onChange={(event) =>
                setRegisterValues((current) => ({
                  ...current,
                  password: event.target.value,
                }))
              }
              placeholder="Sifre"
              required
              type="password"
              value={registerValues.password}
            />
            <button className="btn-primary w-full" type="submit">
              Hesap Olustur
            </button>
          </form>
        )}

        <p className="text-muted mt-4 rounded-md bg-[var(--color-surface-soft)] px-4 py-3 text-sm leading-7">
          {message ||
            'Demo hesaplar: aylin@papershelf.app / 123456 ve mert@papershelf.app / 123456'}
        </p>
      </div>
    </div>
  )
}
