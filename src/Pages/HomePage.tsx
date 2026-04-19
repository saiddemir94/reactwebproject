import { Link, Navigate } from 'react-router-dom'

import { useAppContext } from '../context/useAppContext'

const quickLinks = [
  {
    title: 'Makalelerim',
    description: 'Kendi yazilarini listele, filtrele ve duzenle.',
    to: '/user',
  },
  {
    title: 'Makale Yaz',
    description: 'Yeni bir fizik calismasi icin editor sayfasini ac.',
    to: '/user/new',
  },
]

export function HomePage() {
  const { allPublishedArticles, user, getUserById } = useAppContext()

  if (!user) {
    return <Navigate replace to="/" />
  }

  const featuredArticle = allPublishedArticles[0]
  const recentArticles = allPublishedArticles.slice(1, 4)
  const featuredAuthor = featuredArticle
    ? getUserById(featuredArticle.authorId)
    : undefined

  return (
    <section className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="surface-card overflow-hidden p-0">
          <div className="px-6 py-6 md:px-8 md:py-8">
            <p className="kicker">Anasayfa</p>
            <h1 className="title-serif mt-4 max-w-3xl text-5xl leading-none md:text-6xl">
              Hos geldin, {user.fullName.split(' ')[0]}
            </h1>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {quickLinks.map((item, index) => (
                <Link
                  className="group rounded-md border p-5 transition hover:-translate-y-[1px]"
                  key={item.title}
                  style={{
                    borderColor: 'var(--color-border)',
                    background:
                      index === 0
                        ? 'var(--color-surface-soft)'
                        : 'linear-gradient(135deg, rgba(247,231,216,0.86), rgba(255,253,249,0.92))',
                  }}
                  to={item.to}
                >
                  <p className="text-muted text-xs uppercase tracking-[0.22em]">
                    Hizli Gecis
                  </p>
                  <h2 className="title-serif mt-3 text-3xl leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-soft mt-3 text-sm leading-7">
                    {item.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold">
                    Ac {'>'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="surface-card p-5">
            <p className="kicker">Profil</p>
            <h2 className="title-serif mt-3 text-3xl">{user.fullName}</h2>
            <p className="text-soft mt-3 text-sm">{user.institution}</p>
            <div className="mt-5 rounded-md p-4" style={{ background: 'var(--color-surface-soft)' }}>
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Rol
              </p>
              <p className="mt-2 text-sm font-semibold">{user.role}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="surface-card p-5">
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Yayinlanan Makale
              </p>
              <p className="title-serif mt-2 text-4xl">
                {allPublishedArticles.length}
              </p>
            </div>
            <div className="surface-card p-5">
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Sonraki Adim
              </p>
              <p className="mt-2 text-sm">Yeni bir makale ac veya makalelerini duzenle.</p>
            </div>
          </div>
        </div>
      </div>

      {featuredArticle ? (
        <div className="surface-card p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="kicker">One Cikan Makale</p>
              <h2 className="title-serif mt-3 text-4xl leading-tight md:text-5xl">
                {featuredArticle.title}
              </h2>
              <p className="text-soft mt-4 text-sm leading-8">
                {featuredArticle.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[featuredArticle.category, featuredArticle.type].map((item) => (
                  <span
                    className="rounded-md border px-3 py-1 text-xs text-[var(--color-text-soft)]"
                    key={item}
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="xl:max-w-sm">
              <div
                className="rounded-md p-4"
                style={{ background: 'var(--color-surface-soft)' }}
              >
                <p className="text-muted text-xs uppercase tracking-[0.22em]">
                  Yazar
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {featuredAuthor?.fullName ?? 'PaperShelf Yazari'}
                </p>
                <p className="text-soft mt-2 text-sm">
                  {featuredAuthor?.institution ?? 'PaperShelf Arsivi'}
                </p>
              </div>

              <Link
                className="btn-secondary mt-4 w-full px-4 py-2"
                to={`/articles/${featuredArticle.id}`}
              >
                Ayrintilari Gor
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {recentArticles.length ? (
        <div className="surface-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="kicker">Son Eklenenler</p>
              <h2 className="title-serif mt-3 text-3xl">Yayin akisi</h2>
            </div>
            <Link className="btn-secondary px-4 py-2" to="/user">
              Tumunu Ac
            </Link>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {recentArticles.map((article) => {
              const author = getUserById(article.authorId)

              return (
                <Link
                  className="rounded-md border p-5 transition hover:-translate-y-[1px]"
                  key={article.id}
                  style={{
                    borderColor: 'var(--color-border)',
                    background: 'var(--color-surface-soft)',
                  }}
                  to={`/articles/${article.id}`}
                >
                  <p className="text-muted text-xs uppercase tracking-[0.22em]">
                    {article.category}
                  </p>
                  <h3 className="title-serif mt-3 text-2xl leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-soft mt-3 text-sm leading-7">
                    {article.summary}
                  </p>
                  <p className="mt-4 text-sm font-semibold">
                    {author?.fullName ?? 'PaperShelf Yazari'}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      ) : null}
    </section>
  )
}
