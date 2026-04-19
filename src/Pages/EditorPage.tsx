import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

import { ArticleForm } from '../Components/ArticleForm'
import type { ArticleFormValues } from '../Interfaces/article'
import { useAppContext } from '../context/useAppContext'

const emptyValues: ArticleFormValues = {
  title: '',
  category: '',
  type: 'Kisa Arastirma Notu',
  summary: '',
  keywords: '',
  importance: '',
  content: '',
  status: 'Taslak',
}

export function EditorPage() {
  const navigate = useNavigate()
  const { articleId } = useParams()
  const { addArticle, getArticle, updateArticle, user } = useAppContext()

  if (!user) {
    return <Navigate replace to="/" />
  }

  const editingArticle = articleId ? getArticle(articleId) : undefined

  if (articleId && !editingArticle) {
    return <Navigate replace to="/home" />
  }

  const initialValues: ArticleFormValues = editingArticle
    ? {
        title: editingArticle.title,
        category: editingArticle.category,
        type: editingArticle.type,
        summary: editingArticle.summary,
        keywords: editingArticle.keywords.join(', '),
        importance: editingArticle.importance,
        content: editingArticle.content,
        status: editingArticle.status,
      }
    : emptyValues

  const handleSubmit = (values: ArticleFormValues) => {
    if (editingArticle) {
      updateArticle(editingArticle.id, values)
    } else {
      addArticle(values)
    }

    navigate('/user')
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="surface-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Editor</p>
            <h1 className="title-serif mt-3 text-5xl leading-none">
              {editingArticle ? 'Makale Duzenle' : 'Yeni Makale'}
            </h1>
          </div>

          <Link className="btn-secondary px-4 py-2" to="/user">
            Makalelerime Don
          </Link>
        </div>

        <div className="mt-6">
          <ArticleForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            submitLabel={editingArticle ? 'Guncelle' : 'Kaydet'}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div className="surface-card p-5">
          <p className="kicker">Kullanici</p>
          <h2 className="title-serif mt-3 text-3xl">{user.fullName}</h2>
          <p className="text-soft mt-3 text-sm">{user.institution}</p>
        </div>
      </div>
    </section>
  )
}
