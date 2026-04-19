import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="surface-card mx-auto max-w-2xl p-10 text-center">
      <p className="kicker">404</p>
      <h1 className="title-serif mt-4 text-5xl">Sayfa bulunamadi</h1>
      <p className="text-soft mt-4 text-sm leading-7">
        Aradigin sayfa tasinmis olabilir ya da baglanti hatali olabilir.
      </p>
      <Link className="btn-secondary mt-6 px-5 py-3" to="/home">
        Anasayfaya Don
      </Link>
    </section>
  )
}
