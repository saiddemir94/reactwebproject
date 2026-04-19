import { startTransition, useDeferredValue, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { ArticleList } from '../Components/ArticleList'
import { EmptyState } from '../Components/EmptyState'
import { useAppContext } from '../context/useAppContext'

export function UserPage() {
  const { articles, deleteArticle, user } = useAppContext()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'Tum' | 'Taslak' | 'Yayinda'>(
    'Tum',
  )
  const deferredSearch = useDeferredValue(search)

  const filteredArticles = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase()

    return articles.filter((article) => {
      const matchesStatus =
        statusFilter === 'Tum' || article.status === statusFilter
      const matchesQuery = `${article.title} ${article.category} ${article.summary} ${article.type} ${article.keywords.join(' ')}`
        .toLowerCase()
        .includes(query)

      return matchesStatus && matchesQuery
    })
  }, [articles, deferredSearch, statusFilter])

  if (!user) {
    return <Navigate replace to="/" />
  }

  const draftCount = articles.filter((article) => article.status === 'Taslak').length
  const publishedCount = articles.filter((article) => article.status === 'Yayinda').length
  const featuredArticle = filteredArticles[0]

  const handleDelete = (articleId: string) => {
    const shouldDelete = window.confirm(
      'Bu makaleyi silmek istediginize emin misiniz?',
    )

    if (shouldDelete) {
      deleteArticle(articleId)
    }
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="surface-card p-6">
          <p className="kicker">Kullanici Paneli</p>
          <h1 className="title-serif mt-4 text-5xl leading-none">
            Makalelerini yonet
          </h1>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div
              className="rounded-md p-4"
              style={{ background: 'var(--color-surface-soft)' }}
            >
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Toplam
              </p>
              <p className="title-serif mt-2 text-4xl">{articles.length}</p>
            </div>
            <div
              className="rounded-md p-4"
              style={{ background: 'var(--color-accent-soft)' }}
            >
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Yayinda
              </p>
              <p className="title-serif mt-2 text-4xl">{publishedCount}</p>
            </div>
            <div
              className="rounded-md p-4"
              style={{ background: 'var(--color-surface-soft)' }}
            >
              <p className="text-muted text-xs uppercase tracking-[0.22em]">
                Taslak
              </p>
              <p className="title-serif mt-2 text-4xl">{draftCount}</p>
            </div>
          </div>
        </div>

        <div className="surface-card p-5">
          <p className="kicker">Profil</p>
          <h2 className="title-serif mt-3 text-3xl">{user.fullName}</h2>
          <p className="text-soft mt-3 text-sm leading-7">{user.institution}</p>
          <p className="text-muted mt-2 text-sm">{user.role}</p>

          <div className="mt-5 flex flex-col gap-3">
            <Link className="btn-primary w-full px-4 py-2" to="/user/new">
              Yeni Makale Ekle
            </Link>
            <Link className="btn-secondary w-full px-4 py-2" to="/home">
              Anasayfaya Don
            </Link>
          </div>
        </div>
      </div>

      <div className="surface-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              className={statusFilter === 'Tum' ? 'tab-button-active' : 'tab-button'}
              onClick={() => setStatusFilter('Tum')}
              type="button"
            >
              Tumu
            </button>
            <button
              className={statusFilter === 'Taslak' ? 'tab-button-active' : 'tab-button'}
              onClick={() => setStatusFilter('Taslak')}
              type="button"
            >
              Taslak
            </button>
            <button
              className={statusFilter === 'Yayinda' ? 'tab-button-active' : 'tab-button'}
              onClick={() => setStatusFilter('Yayinda')}
              type="button"
            >
              Yayinda
            </button>
          </div>

          <input
            className="field-input lg:max-w-md"
            onChange={(event) => {
              const value = event.target.value
              startTransition(() => setSearch(value))
            }}
            placeholder="Baslik, kategori veya anahtar kelime ara"
            value={search}
          />
        </div>
      </div>

      {featuredArticle ? (
        <div className="surface-card p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="kicker">Secili Makale</p>
              <h2 className="title-serif mt-3 text-4xl leading-tight">
                {featuredArticle.title}
              </h2>
              <p className="text-soft mt-3 text-sm leading-7">
                {featuredArticle.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                className="btn-secondary px-4 py-2"
                to={`/articles/${featuredArticle.id}`}
              >
                Gor
              </Link>
              <Link
                className="btn-secondary px-4 py-2"
                to={`/user/edit/${featuredArticle.id}`}
              >
                Duzenle
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {filteredArticles.length ? (
        <ArticleList articles={filteredArticles} onDelete={handleDelete} />
      ) : (
        <EmptyState />
      )}
    </section>
  )
}
