import React from 'react'
import { useLeaderboard } from '../lib/hooks'

export default function Leaderboard({ category }) {
  const { leaderboard } = useLeaderboard(category)
  return (
    <>
      <style jsx>{`
        section {
          display: block;
          text-align: center;
        }
        table {
          color: #fff;
          padding: unset;
          width: 94%;
        }
      `}</style>
      <section>
        {leaderboard ? (
          <>
            <h2>LEADERBOARD</h2>
            <table>
              <tr>
                <th>Rank</th>
                <th>Score</th>
                <th>Initials</th>
              </tr>
              {leaderboard.map((score, ind: number) => (
                <tr key={score.initials + score.score + score.dateEntered}>
                  <td>#{ind + 1}</td>
                  <td>{`${score.score}`.padStart(4, '0')}</td>
                  <td>{score.initials}</td>
                  {/* <td>0</td> */}
                </tr>
              ))}
            </table>
          </>
        ) : <h3>Grabbing latest leaderboard, please wait..</h3>}
      </section>
    </>
  )
}
