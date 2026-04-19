import { createContext } from 'react'

import type { Article, ArticleFormValues } from '../Interfaces/article'
import type { RegisterFormValues, User } from '../Interfaces/user'

export interface AppContextValue {
  user: User | null
  articles: Article[]
  allPublishedArticles: Article[]
  login: (email: string, password: string) => { ok: boolean; message: string }
  register: (values: RegisterFormValues) => { ok: boolean; message: string }
  logout: () => void
  addArticle: (values: ArticleFormValues) => void
  updateArticle: (articleId: string, values: ArticleFormValues) => void
  deleteArticle: (articleId: string) => void
  getArticle: (articleId: string) => Article | undefined
  getUserById: (userId: string) => User | undefined
}

export const AppContext = createContext<AppContextValue | undefined>(undefined)
