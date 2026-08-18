import { riceScore } from '../utils/rice'
import FeatureCard from './FeatureCard'

export default function Board({ features, onRemove }) {
  const ranked = [...features].sort((a, b) => riceScore(b) - riceScore(a))
  const maxScore = ranked.length ? riceScore(ranked[0]) : 0

  if (!ranked.length) {
    return (
      <div className="empty">
        <p>The board is empty.</p>
        <p className="empty-sub">Submit a feature on the left to open the line.</p>
      </div>
    )
  }

  return (
    <ul className="board">
      {ranked.map((feature, i) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          rank={i + 1}
          maxScore={maxScore}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}
