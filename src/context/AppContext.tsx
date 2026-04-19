import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { Article, ArticleFormValues } from '../Interfaces/article'
import type { RegisterFormValues, User } from '../Interfaces/user'
import {
  createArticle,
  createUser,
  readArticles,
  readSession,
  readUsers,
  writeArticles,
  writeSession,
  writeUsers,
} from '../lib/storage'
import { AppContext } from './app-context'

export function AppProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<User[]>(() => readUsers())
  const [articles, setArticles] = useState<Article[]>(() => readArticles())
  const [sessionUserId, setSessionUserId] = useState<string | null>(() =>
    readSession(),
  )

  const user = users.find((entry) => entry.id === sessionUserId) ?? null
  const ownArticles = useMemo(
    () =>
      user
        ? articles.filter((article) => article.authorId === user.id)
        : [],
    [articles, user],
  )
  const allPublishedArticles = useMemo(
    () => articles.filter((article) => article.status === 'Yayinda'),
    [articles],
  )

  useEffect(() => {
    writeArticles(articles)
  }, [articles])

  useEffect(() => {
    writeUsers(users)
  }, [users])

  useEffect(() => {
    writeSession(sessionUserId)
  }, [sessionUserId])

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()
    const foundUser = users.find(
      (entry) =>
        entry.email === normalizedEmail && entry.password === password,
    )

    if (!foundUser) {
      return {
        ok: false,
        message:
          'Giris basarisiz. Demo hesaplar: aylin@papershelf.app / 123456 veya mert@papershelf.app / 123456',
      }
    }

    setSessionUserId(foundUser.id)

    return {
      ok: true,
      message: `${foundUser.fullName} olarak giris yapildi.`,
    }
  }

  const register = (values: RegisterFormValues) => {
    const normalizedEmail = values.email.trim().toLowerCase()

    if (users.some((entry) => entry.email === normalizedEmail)) {
      return {
        ok: false,
        message: 'Bu e-posta ile daha once hesap olusturulmus.',
      }
    }

    const nextUser = createUser({ ...values, email: normalizedEmail })
    setUsers((current) => [nextUser, ...current])
    setSessionUserId(nextUser.id)

    return {
      ok: true,
      message: 'Hesap olusturuldu ve giris yapildi.',
    }
  }

  const logout = () => {
    setSessionUserId(null)
  }

  const addArticle = (values: ArticleFormValues) => {
    if (!user) {
      return
    }

    setArticles((current) => [createArticle(user.id, values), ...current])
  }

  const updateArticle = (articleId: string, values: ArticleFormValues) => {
    if (!user) {
      return
    }

    setArticles((current) =>
      current.map((article) =>
        article.id === articleId && article.authorId === user.id
          ? {
              ...article,
              title: values.title.trim(),
              category: values.category.trim(),
              type: values.type,
              summary: values.summary.trim(),
              keywords: values.keywords
                .split(',')
                .map((keyword) => keyword.trim())
                .filter(Boolean),
              importance: values.importance.trim(),
              content: values.content.trim(),
              status: values.status,
              updatedAt: new Date().toISOString(),
            }
          : article,
      ),
    )
  }

  const deleteArticle = (articleId: string) => {
    if (!user) {
      return
    }

    setArticles((current) =>
      current.filter(
        (article) => !(article.id === articleId && article.authorId === user.id),
      ),
    )
  }

  const getArticle = (articleId: string) =>
    articles.find((article) => article.id === articleId)
  const getUserById = (userId: string) =>
    users.find((entry) => entry.id === userId)

  const value = {
    user,
    articles: ownArticles,
    allPublishedArticles,
    login,
    register,
    logout,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticle,
    getUserById,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
