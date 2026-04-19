import { useEffect, useState, type FormEvent } from 'react'

import type { ArticleFormValues } from '../Interfaces/article'

interface ArticleFormProps {
  initialValues: ArticleFormValues
  onSubmit: (values: ArticleFormValues) => void
  submitLabel: string
}

const inputClass = 'field-input'
const labelClass = 'text-sm font-semibold text-[var(--color-text-soft)]'

export function ArticleForm({
  initialValues,
  onSubmit,
  submitLabel,
}: ArticleFormProps) {
  const [values, setValues] = useState<ArticleFormValues>(initialValues)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(values)
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClass}>Baslik</label>
          <input
            className={inputClass}
            onChange={(event) =>
              setValues((current) => ({ ...current, title: event.target.value }))
            }
            required
            value={values.title}
          />
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Kategori</label>
          <input
            className={inputClass}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                category: event.target.value,
              }))
            }
            required
            value={values.category}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClass}>Yayin turu</label>
          <select
            className={inputClass}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                type: event.target.value as ArticleFormValues['type'],
              }))
            }
            value={values.type}
          >
            <option value="Deney Raporu">Deney Raporu</option>
            <option value="Teorik Inceleme">Teorik Inceleme</option>
            <option value="Kisa Arastirma Notu">Kisa Arastirma Notu</option>
            <option value="Literatur Ozeti">Literatur Ozeti</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Anahtar kelimeler</label>
          <input
            className={inputClass}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                keywords: event.target.value,
              }))
            }
            placeholder="kuantum, spektrum, deney"
            value={values.keywords}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Ozet</label>
        <textarea
          className={`${inputClass} min-h-28 resize-y`}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              summary: event.target.value,
            }))
          }
          required
          value={values.summary}
        />
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Bu calisma neden onemli</label>
        <textarea
          className={`${inputClass} min-h-24 resize-y`}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              importance: event.target.value,
            }))
          }
          value={values.importance}
        />
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Icerik</label>
        <textarea
          className={`${inputClass} min-h-64 resize-y`}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              content: event.target.value,
            }))
          }
          required
          value={values.content}
        />
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Durum</label>
        <select
          className={inputClass}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              status: event.target.value as ArticleFormValues['status'],
            }))
          }
          value={values.status}
        >
          <option value="Taslak">Taslak</option>
          <option value="Yayinda">Yayinda</option>
        </select>
      </div>

      <button className="btn-primary px-6" type="submit">
        {submitLabel}
      </button>
    </form>
  )
}
