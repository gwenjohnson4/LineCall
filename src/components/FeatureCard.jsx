import { riceScore, toOdds, tier } from '../utils/rice'

export default function FeatureCard({ feature, rank, maxScore, onRemove }) {
  const score = riceScore(feature)
  const odds = toOdds(score, maxScore)
  const t = tier(score, maxScore)

  return (
    <li className={`card card-${t}`}>
      <div className="card-rank">{String(rank).padStart(2, '0')}</div>

      <div className="card-body">
        <div className="card-top">
          <h3>{feature.name}</h3>
          <button className="card-remove" onClick={() => onRemove(feature.id)} aria-label={`Remove ${feature.name}`}>
            ×
          </button>
        </div>

        <dl className="card-stats">
          <div>
            <dt>Reach</dt>
            <dd>{feature.reach.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Impact</dt>
            <dd>{feature.impact}×</dd>
          </div>
          <div>
            <dt>Confidence</dt>
            <dd>{feature.confidence}%</dd>
          </div>
          <div>
            <dt>Effort</dt>
            <dd>{feature.effort}mo</dd>
          </div>
        </dl>
      </div>

      <div className="card-line">
        <span className="card-tier">{t}</span>
        <span className="card-odds">{odds}</span>
        <span className="card-score">RICE {score.toFixed(1)}</span>
      </div>
    </li>
  )
}
