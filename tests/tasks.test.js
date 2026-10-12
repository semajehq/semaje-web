import { test } from 'node:test'
import assert from 'node:assert/strict'
import { defaultOptions, groupTasks } from '../src/utils/tasks.js'

const TASKS = {
  transcription: { label: 'Transcription', category: 'core', options: [
    { key: 'speakerLabels', default: true }, { key: 'timestamps', default: false }] },
  summary: { label: 'Summary', category: 'analysis', options: [] },
  subtitles: { label: 'Subtitles', category: 'core', options: [{ key: 'maxChars', default: 42 }] },
}

test('defaultOptions reads each option default', () => {
  assert.deepEqual(defaultOptions(TASKS, 'transcription'), { speakerLabels: true, timestamps: false })
  assert.deepEqual(defaultOptions(TASKS, 'summary'), {})
  assert.deepEqual(defaultOptions(TASKS, 'unknown'), {})
  assert.deepEqual(defaultOptions(null, 'transcription'), {})
})

test('groupTasks keeps catalog order within each category', () => {
  const g = groupTasks(TASKS)
  assert.deepEqual(g.core.map(t => t.id), ['transcription', 'subtitles'])
  assert.deepEqual(g.analysis.map(t => t.id), ['summary'])
})
