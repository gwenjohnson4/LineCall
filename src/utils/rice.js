// RICE = (Reach * Impact * Confidence) / Effort
// Reach: users/period affected (number)
// Impact: 0.25 (minimal) - 3 (massive)
// Confidence: 0-100%
// Effort: person-months

export function riceScore({ reach, impact, confidence, effort }) {
  if (!effort || effort <= 0) return 0
  return (reach * impact * (confidence / 100)) / effort
}

// Converts a RICE score into an American-odds-style label, the way a
// sportsbook expresses a favorite (negative) vs an underdog (positive).
// The top-ranked item in the current board is the "favorite" and gets
// the shortest (most negative) line; everything else gets priced
// relative to it as a longer shot.
export function toOdds(score, maxScore) {
  if (maxScore <= 0 || score <= 0) return '+900'

  const ratio = score / maxScore // 0..1, 1 = favorite

  if (ratio >= 0.98) {
    // Heavy favorite: scale from -150 to -600 as ratio -> 1
    const line = -150 - Math.round((ratio - 0.5) * 900)
    return `${line}`
  }

  if (ratio >= 0.5) {
    // Moderate favorite: -100 to -150
    const line = -100 - Math.round((ratio - 0.5) * 100)
    return `${line}`
  }

  // Underdog: +100 to +700 as ratio -> 0
  const line = 100 + Math.round((0.5 - ratio) * 1200)
  return `+${line}`
}

export function tier(score, maxScore) {
  if (maxScore <= 0) return 'longshot'
  const ratio = score / maxScore
  if (ratio >= 0.85) return 'favorite'
  if (ratio >= 0.5) return 'contender'
  return 'longshot'
}
