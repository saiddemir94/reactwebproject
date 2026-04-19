export interface Article {
  id: string
  authorId: string
  title: string
  category: string
  type: 'Deney Raporu' | 'Teorik Inceleme' | 'Kisa Arastirma Notu' | 'Literatur Ozeti'
  summary: string
  keywords: string[]
  importance: string
  content: string
  status: 'Taslak' | 'Yayinda'
  createdAt: string
  updatedAt: string
}

export interface ArticleFormValues {
  title: string
  category: string
  type: 'Deney Raporu' | 'Teorik Inceleme' | 'Kisa Arastirma Notu' | 'Literatur Ozeti'
  summary: string
  keywords: string
  importance: string
  content: string
  status: 'Taslak' | 'Yayinda'
}
