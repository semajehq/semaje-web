import { useEffect, useState } from 'react'
import { api } from '../utils/apiClient'

// One fetch per page load, shared by every component that needs the catalog.
let catalogPromise = null

export function loadTaskCatalog() {
  if (!catalogPromise) {
    catalogPromise = api('/api/tasks')
      .then(async res => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || `Could not load tasks (${res.status})`)
        return data
      })
      .catch(err => { catalogPromise = null; throw err })
  }
  return catalogPromise
}

export function useTaskCatalog() {
  const [state, setState] = useState({ tasks: null, categories: {}, error: '' })
  useEffect(() => {
    let alive = true
    loadTaskCatalog()
      .then(({ tasks, categories }) => { if (alive) setState({ tasks, categories, error: '' }) })
      .catch(err => { if (alive) setState(s => ({ ...s, error: err.message })) })
    return () => { alive = false }
  }, [])
  return state
}
