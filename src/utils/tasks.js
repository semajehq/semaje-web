// Task catalog helpers. The catalog itself is served by the platform API
// (GET /api/tasks), which owns the prompt library; the web app only renders it.

/** Default option values for a task, e.g. { speakerLabels: true, timestamps: false }. */
export function defaultOptions(tasks, taskId) {
  const task = tasks?.[taskId]
  if (!task) return {}
  return Object.fromEntries((task.options || []).map(opt => [opt.key, opt.default]))
}

/** Tasks grouped by category, in catalog order: { core: [{id, ...def}], ... }. */
export function groupTasks(tasks) {
  const grouped = {}
  for (const [id, def] of Object.entries(tasks || {})) {
    ;(grouped[def.category] ||= []).push({ id, ...def })
  }
  return grouped
}
