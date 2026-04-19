import { Route, Routes } from 'react-router-dom'

import { ArticleDetailPage } from './Pages/ArticleDetailPage'
import { EditorPage } from './Pages/EditorPage'
import { HomePage } from './Pages/HomePage'
import { LayoutPage } from './Pages/LayoutPage'
import { LoginPage } from './Pages/LoginPage'
import { NotFoundPage } from './Pages/NotFoundPage'
import { UserPage } from './Pages/UserPage'

function App() {
  return (
    <Routes>
      <Route element={<LayoutPage />} path="/">
        <Route element={<LoginPage />} index />
        <Route element={<HomePage />} path="home" />
        <Route element={<UserPage />} path="user" />
        <Route element={<EditorPage />} path="user/new" />
        <Route element={<EditorPage />} path="user/edit/:articleId" />
        <Route element={<ArticleDetailPage />} path="articles/:articleId" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}

export default App
