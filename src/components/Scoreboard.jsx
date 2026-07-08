export default function Scoreboard({score, highScore}) {
    return (
    <div className="scoreboard">
        <div className="score-board">Score : <strong>{score}</strong></div>
        <div className="high-score">Highscore : <strong>{highScore}</strong></div>
    </div>
    )
}