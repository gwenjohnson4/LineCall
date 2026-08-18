import { useEffect, useState } from 'react'
import FeatureForm from './components/FeatureForm'
import Board from './components/Board'
import './App.css'

const STORAGE_KEY = 'linecall.features.v1'

const seedFeatures = [
  {
    id: 'seed-1',
    name: 'Live parlay cash-out',
    reach: 42000,
    impact: 2,
    confidence: 85,
    effort: 3,
  },
  {
    id: 'seed-2',
    name: 'Push alerts on line movement',
    reach: 61000,
    impact: 1,
    confidence: 90,
    effort: 1,
  },
  {
    id: 'seed-3',
    name: 'Dark mode',
    reach: 38000,
    impact: 0.5,
    confidence: 95,
    effort: 0.5,
  },
  {
    id: 'seed-4',
    name: 'Social bet-sharing feed',
    reach: 15000,
    impact: 2,
    confidence: 40,
    effort: 5,
  },
]

function loadFeatures() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedFeatures
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length ? parsed : seedFeatures
  } catch {
    return seedFeatures
  }
}

export default function App() {
  const [features, setFeatures] = useState(loadFeatures)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(features))
  }, [features])

  function addFeature(feature) {
    setFeatures((prev) => [...prev, feature])
  }

  function removeFeature(id) {
    setFeatures((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead-eyebrow">Product Prioritization Board</div>
        <h1>LINECALL</h1>
        <p className="masthead-sub">
          Every feature request gets a line. Reach, impact, and confidence set the odds — effort sets the vig.
        </p>
      </header>

      <main className="layout">
        <FeatureForm onAdd={addFeature} />
        <section className="board-section">
          <div className="board-header">
            <h2>The Board</h2>
            <span className="board-count">{features.length} open lines</span>
          </div>
          <Board features={features} onRemove={removeFeature} />
        </section>
      </main>

      <footer className="foot">
        <span>Scored with RICE (Reach × Impact × Confidence ÷ Effort). Favorites ship first.</span>
      </footer>
    </div>
  )
}
