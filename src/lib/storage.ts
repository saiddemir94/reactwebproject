import type { Article, ArticleFormValues } from '../Interfaces/article'
import type { RegisterFormValues, User } from '../Interfaces/user'

const ARTICLES_KEY = 'papershelf.articles'
const USERS_KEY = 'papershelf.users'
const SESSION_KEY = 'papershelf.session'

const seedUsers: User[] = [
  {
    id: 'user-1',
    fullName: 'Aylin Demir',
    email: 'aylin@papershelf.app',
    institution: 'Bagimsiz Arastirma Notlari Atolyesi',
    role: 'Genc arastirmaci ve yazar',
    password: '123456',
  },
  {
    id: 'user-2',
    fullName: 'Mert Aydin',
    email: 'mert@papershelf.app',
    institution: 'Student Physics Notes Lab',
    role: 'Deney raporu yazari',
    password: '123456',
  },
]

const seedArticles: Article[] = [
  {
    id: 'article-1',
    authorId: 'user-1',
    title: 'Dalga fonksiyonlarini not defterinden makale duzenine tasimak',
    category: 'Kuantum Fizigi',
    type: 'Teorik Inceleme',
    summary:
      'Daginik ders notlari ve kisa hesaplamalarin, okunabilir bir arastirma metnine donusmesi icin temel bir yapi onerir.',
    keywords: ['dalga fonksiyonu', 'kuantum fizigi', 'not duzeni'],
    importance:
      'Teorik notlarin daginik olmadan saklanmasi, daha sonra ayni konuyu yeniden calisirken ciddi zaman kazandirir.',
    content:
      'Bu metin, arastirma odakli bir yazar platformunun nasil kullanilabilecegini gostermek icin ornek icerik olarak eklenmistir.\n\nBir ogrenci ya da genc arastirmaci, once ders ve laboratuvar notlarini toplar; ardindan bu notlari baslik, ozet ve icerik akisi icinde yeniden kurar. Boylesi bir duzen, notlarin sadece saklanmasini degil, daha sonra tekrar okunup gelistirilmesini de kolaylastirir.\n\nPaperShelf yaklasimi, fizik ve arastirma odakli calismalari sade bir panelde tutmayi, arastirma surecini daha okunabilir hale getirmeyi ve kisisel bir akademik arsiv olusturmayi hedefler.',
    status: 'Yayinda',
    createdAt: '2026-04-08T08:00:00.000Z',
    updatedAt: '2026-04-08T08:00:00.000Z',
  },
  {
    id: 'article-2',
    authorId: 'user-1',
    title: 'Basit sarkac deneyinden olcum hatasi yorumuna',
    category: 'Deneysel Fizik',
    type: 'Deney Raporu',
    summary:
      'Bir laboratuvar deney raporunun, sadece sonuc degil yorum ve ogrenci gozlemi de tasiyan daha guclu bir yapiyla yazilmasini ele alir.',
    keywords: ['sarkac', 'olcum hatasi', 'laboratuvar'],
    importance:
      'Deney raporlarinda sonucu, yorumlari ve sapma nedenlerini birlikte saklamak daha guclu bir ogrenme izi birakir.',
    content:
      'Laboratuvar raporlari cogu zaman sadece form doldurma duzeninde kalir. Oysa deneyin kurulumu, gozlenen sapmalar ve hesaplama sirasinda yapilan varsayimlar da arastirma dusuncesinin bir parcasidir.\n\nBu ornek metin, deney raporlarini daha editoriyal bir dile tasimak icin kullanilan alanlarin nasil doldurulabilecegini gosterir. Boylece kullanici yalnizca veri saklamaz; ayni zamanda dusunme surecini de arsivler.',
    status: 'Taslak',
    createdAt: '2026-04-09T09:30:00.000Z',
    updatedAt: '2026-04-09T09:30:00.000Z',
  },
  {
    id: 'article-3',
    authorId: 'user-2',
    title: 'Spektral cizgileri ogrenci gozlemleriyle yorumlamak',
    category: 'Astrofizik',
    type: 'Kisa Arastirma Notu',
    summary:
      'Gozlem notlari ile kisa teorik yorumlari bir arada saklayan, baslangic seviyesinde bir inceleme yazisi.',
    keywords: ['spektroskopi', 'astrofizik', 'gozlem notlari'],
    importance:
      'Gozleme dayali kisa notlarin kaybolmadan arsivlenmesi, sonraki arastirmalara daha saglam bir baslangic verir.',
    content:
      'Bu kayit ikinci demo hesap icin tutulur. Boylece giris yapan kullanici degistiginde panelde gorulen makaleler de degisir.\n\nPaperShelf yapisinda her kullanici kendi metinlerini gorur, kendi calismalarini duzenler ve baska hesaplarin kayitlarini yonetemez.',
    status: 'Yayinda',
    createdAt: '2026-04-07T11:00:00.000Z',
    updatedAt: '2026-04-07T11:00:00.000Z',
  },
  {
    id: 'article-4',
    authorId: 'user-2',
    title: 'Manyetik alan cizgilerini laboratuvar eskizlerinden okumak',
    category: 'Elektromanyetizma',
    type: 'Literatur Ozeti',
    summary:
      'Laboratuvar cizimleri ve kisa gozlem notlari uzerinden manyetik alan duzenlerinin nasil daha sistemli yorumlanabilecegini tartisir.',
    keywords: ['manyetik alan', 'elektromanyetizma', 'laboratuvar notu'],
    importance:
      'Soyut alan kavramlarini cizim ve gozlem notlariyla birlestirmek, ogrencinin kavramsal takibini guclendirir.',
    content:
      'Elektromanyetizma notlari cogu zaman formuller ve hizli eskizler halinde daginik kalir. Bu ornek metin, bu notlari daha acik bir duzene tasimak icin kullanilir.\n\nAlan cizgileri, laboratuvar duzeni ve yorum notlari ayni arastirma akisinda saklandiginda, sonradan tekrar bakmak cok daha kolay olur.',
    status: 'Yayinda',
    createdAt: '2026-04-10T08:40:00.000Z',
    updatedAt: '2026-04-10T08:40:00.000Z',
  },
  {
    id: 'article-5',
    authorId: 'user-1',
    title: 'Kucuk teleskop gozlemlerinden yildiz rengi notlari cikarmak',
    category: 'Astrofizik',
    type: 'Kisa Arastirma Notu',
    summary:
      'Baslangic duzeyindeki gece gozlemlerinin, basit renk ve parlaklik notlariyla nasil arastirma gunlugune donusebilecegini gosterir.',
    keywords: ['teleskop', 'yildiz rengi', 'gozlem notu'],
    importance:
      'Kucuk gozlemler bile duzenli tutuldugunda, ogrencinin kendi arastirma aliskanligini kurmasina yardimci olur.',
    content:
      'Bu ornek, buyuk veri setleri olmadan da arastirma notu uretebilmenin mumkun oldugunu gosterir.\n\nKisa gece gozlemleri, renk notlari ve karsilastirmali yorumlar bir araya geldiginde, sade ama faydali bir astrofizik arastirma gunlugu olusur.',
    status: 'Yayinda',
    createdAt: '2026-04-10T10:10:00.000Z',
    updatedAt: '2026-04-10T10:10:00.000Z',
  },
]

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  const raw = window.localStorage.getItem(key)

  if (!raw) {
    window.localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }

  try {
    return JSON.parse(raw) as T
  } catch {
    window.localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function readUsers() {
  return readJSON<User[]>(USERS_KEY, seedUsers)
}

export function writeUsers(users: User[]) {
  writeJSON(USERS_KEY, users)
}

export function readSession() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.sessionStorage.getItem(SESSION_KEY)
}

export function writeSession(userId: string | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (!userId) {
    window.sessionStorage.removeItem(SESSION_KEY)
    return
  }

  window.sessionStorage.setItem(SESSION_KEY, userId)
}

export function readArticles() {
  return readJSON<Article[]>(ARTICLES_KEY, seedArticles)
}

export function writeArticles(articles: Article[]) {
  writeJSON(ARTICLES_KEY, articles)
}

export function createArticle(
  authorId: string,
  values: ArticleFormValues,
): Article {
  const now = new Date().toISOString()

  return {
    id: crypto.randomUUID(),
    authorId,
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
    createdAt: now,
    updatedAt: now,
  }
}

export function createUser(values: RegisterFormValues): User {
  return {
    id: crypto.randomUUID(),
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    institution: values.institution.trim(),
    role: values.role.trim(),
    password: values.password,
  }
}
