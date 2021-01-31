import React from 'react'
import { Icon } from 'semantic-ui-react'

export default function Footer() {
  return (
    <>
      <style jsx>{`
        footer {
          position: relative;
          background-color: #020202ad;
          color: white;
          text-align: center;
          margin-top: 1rem;
          padding: 3rem 1rem;
          width: 100%;
        }
        footer * {
          padding: 0.25rem;
        }

        footer a:hover {
          color: #0070f3;
          text-decoration: underline;
        }
        aside {
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
      `}</style>
      <footer className="footer gentle-flex-centered">
        <section>
          <span style={{ fontSize: 'var(--heading-4)' }}>
            &copy; 2020-2021 \\{' '}
            <a href="https://www.gusvalenzuela.com">Gus Valenzuela</a>
            \\{' '}
            <a href="https://github.com/gusvalenzuela/nxt-quiz-game">
              <Icon name="github" />
            </a>
          </span>
        </section>
      </footer>
    </>
  )
}
