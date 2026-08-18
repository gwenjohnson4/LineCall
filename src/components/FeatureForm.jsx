import { useState } from 'react'

const initial = {
  name: '',
  reach: 5000,
  impact: 1,
  confidence: 80,
  effort: 2,
}

const impactOptions = [
  { value: 0.25, label: 'Minimal' },
  { value: 0.5, label: 'Low' },
  { value: 1, label: 'Medium' },
  { value: 2, label: 'High' },
  { value: 3, label: 'Massive' },
]

export default function FeatureForm({ onAdd }) {
  const [form, setForm] = useState(initial)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    onAdd({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      reach: Number(form.reach),
      impact: Number(form.impact),
      confidence: Number(form.confidence),
      effort: Number(form.effort),
    })
    setForm(initial)
  }

  return (
    <form className="intake" onSubmit={handleSubmit}>
      <div className="intake-eyebrow">Submit a line</div>
      <h2 className="intake-title">Enter the feature</h2>

      <label className="field">
        <span>Feature name</span>
        <input
          type="text"
          placeholder="e.g. Live parlay cash-out"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>Reach <em>— users touched per quarter</em></span>
        <input
          type="number"
          min="0"
          step="100"
          value={form.reach}
          onChange={(e) => update('reach', e.target.value)}
        />
      </label>

      <label className="field">
        <span>Impact <em>— per-user effect</em></span>
        <select value={form.impact} onChange={(e) => update('impact', e.target.value)}>
          {impactOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Confidence <em>— {form.confidence}%</em></span>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={form.confidence}
          onChange={(e) => update('confidence', e.target.value)}
        />
      </label>

      <label className="field">
        <span>Effort <em>— person-months</em></span>
        <input
          type="number"
          min="0.25"
          step="0.25"
          value={form.effort}
          onChange={(e) => update('effort', e.target.value)}
        />
      </label>

      <button type="submit" className="btn-place">
        Place on the board
      </button>
    </form>
  )
}
