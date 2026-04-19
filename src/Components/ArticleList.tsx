import { Link } from 'react-router-dom'

import type { Article } from '../Interfaces/article'

interface ArticleListProps {
  articles: Article[]
  onDelete: (articleId: string) => void
}

const badgeClass = {
  Taslak: {
    background: 'var(--color-surface-soft)',
    color: 'var(--color-text-soft)',
  },
  Yayinda: {
    background: 'var(--color-accent-soft)',
    color: 'var(--color-accent-strong)',
  },
}

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function ArticleList({ articles, onDelete }: ArticleListProps) {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <article className="surface-card p-5 transition hover:-translate-y-[1px]" key={article.id}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-md px-3 py-1 text-xs font-semibold"
                  style={badgeClass[article.status]}
                >
                  {article.status}
                </span>
                <span className="text-muted text-xs uppercase tracking-[0.22em]">
                  {article.category}
                </span>
                <span className="text-muted text-xs uppercase tracking-[0.22em]">
                  {article.type}
                </span>
              </div>

              <div>
                <h3 className="title-serif text-3xl">{article.title}</h3>
                <p className="text-soft mt-2 max-w-2xl text-sm leading-7">
                  {article.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.keywords.map((keyword) => (
                    <span
                      className="rounded-full border px-3 py-1 text-xs text-[var(--color-text-soft)]"
                      key={keyword}
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-muted text-xs uppercase tracking-[0.2em]">
                Son Guncelleme
              </p>
              <p className="mt-2 text-sm">
                {dateFormatter.format(new Date(article.updatedAt))}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link className="btn-secondary px-4 py-2" to={`/articles/${article.id}`}>
              Gor
            </Link>
            <Link className="btn-secondary px-4 py-2" to={`/user/edit/${article.id}`}>
              Duzenle
            </Link>
            <button
              className="btn-danger px-4 py-2"
              onClick={() => onDelete(article.id)}
              type="button"
            >
              Sil
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
