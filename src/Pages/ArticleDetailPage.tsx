import { Link, Navigate, useParams } from 'react-router-dom'

import { useAppContext } from '../context/useAppContext'

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

export function ArticleDetailPage() {
  const { articleId } = useParams()
  const { getArticle, getUserById, user } = useAppContext()

  if (!user) {
    return <Navigate replace to="/" />
  }

  const article = articleId ? getArticle(articleId) : undefined

  if (!article) {
    return <Navigate replace to="/user" />
  }

  const author = getUserById(article.authorId)

  return (
    <article className="space-y-6">
      <section className="surface-card p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-4xl">
            <p className="kicker">Makale Detayi</p>
            <h1 className="title-serif mt-4 text-5xl leading-tight">
              {article.title}
            </h1>
            <p className="text-soft mt-5 text-sm leading-8">{article.summary}</p>
          </div>

          <div className="xl:w-60">
            <span
              className="inline-flex rounded-md px-3 py-1 text-xs font-semibold"
              style={{
                background:
                  article.status === 'Yayinda'
                    ? 'var(--color-accent-soft)'
                    : 'var(--color-surface-soft)',
                color:
                  article.status === 'Yayinda'
                    ? 'var(--color-accent-strong)'
                    : 'var(--color-text-soft)',
              }}
            >
              {article.status}
            </span>

            <div
              className="mt-4 rounded-md p-4"
              style={{ background: 'var(--color-surface-soft)' }}
            >
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Yazar
              </p>
              <p className="mt-2 text-sm font-semibold">
                {author?.fullName ?? 'PaperShelf Yazari'}
              </p>
              <p className="text-soft mt-2 text-sm">
                {author?.institution ?? 'PaperShelf Arsivi'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div
            className="rounded-md p-4"
            style={{ background: 'var(--color-surface-soft)' }}
          >
            <p className="text-muted text-xs uppercase tracking-[0.22em]">
              Kategori
            </p>
            <p className="mt-2 text-sm font-semibold">{article.category}</p>
          </div>
          <div
            className="rounded-md p-4"
            style={{ background: 'var(--color-surface-soft)' }}
          >
            <p className="text-muted text-xs uppercase tracking-[0.22em]">
              Yayin Turu
            </p>
            <p className="mt-2 text-sm font-semibold">{article.type}</p>
          </div>
          <div
            className="rounded-md p-4"
            style={{ background: 'var(--color-surface-soft)' }}
          >
            <p className="text-muted text-xs uppercase tracking-[0.22em]">
              Son Guncelleme
            </p>
            <p className="mt-2 text-sm font-semibold">
              {dateFormatter.format(new Date(article.updatedAt))}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {article.keywords.map((item) => (
            <span
              className="rounded-md border px-3 py-1 text-xs text-[var(--color-text-soft)]"
              key={item}
              style={{ borderColor: 'var(--color-border)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="surface-card p-6">
        <p className="kicker">Icerik</p>
        <div className="mt-4 whitespace-pre-line text-sm leading-8 text-[var(--color-text)]">
          {article.content}
        </div>
      </section>

      <section
        className="surface-card p-6"
        style={{ background: 'linear-gradient(135deg, rgba(247,231,216,0.9), rgba(255,253,249,0.96))' }}
      >
        <p className="kicker">Neden Onemli</p>
        <p className="mt-4 text-sm leading-8 text-[var(--color-text-soft)]">
          {article.importance}
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link className="btn-secondary w-full" to="/user">
          Panele Don
        </Link>
        <Link className="btn-primary w-full" to={`/user/edit/${article.id}`}>
          Duzenle
        </Link>
      </div>
    </article>
  )
}
