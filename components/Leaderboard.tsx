import React from 'react'
import { useLeaderboard } from '../lib/hooks'

export default function Leaderboard({ category }) {
  const { leaderboard } = useLeaderboard(category)
  // console.log(leaderboard)
  return (
    <>
      <style jsx>{`
        section {
          display: block;
          text-align: center;
          max-width: 800px;
          color: #fff;
        }
        h3 {
          margin: 0.5rem auto;
        }
        table {
          color: #fff;
          padding: unset;
          width: 94%;
        }
      `}</style>
      <section>
        {leaderboard && leaderboard?.length ? (
          <>
            <h2>Score Ranking</h2>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Score</th>
                  <th>Name</th>
                  <th>Correct Answers</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((score, ind: number) => (
                  <tr key={score.initials + score.score + score.dateEntered}>
                    <td>#{ind + 1}</td>
                    <td>{`${score.score}`.padStart(4, '0')}</td>
                    <td>{score.initials}</td>
                    <td>N/A</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : leaderboard ? (
          <h3>
            Seems to be no scores for this category. <br />
            Try another or play and submit your own!
          </h3>
        ) : (
          <h3>Grabbing latest leaderboard, please wait..</h3>
        )}
      </section>
    </>
  )
}
