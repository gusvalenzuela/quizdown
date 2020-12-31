import React from 'react'

export default function Footer() {
  return (
    <>
      <style jsx>{`
        footer {
          position: relative;
          background-color: #eaeaea10;
          color: white;
          text-align: center;
          margin-top: 1rem;
          padding: 3rem 1rem;
          width: 100%;
          display: flex;
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
        }
      `}</style>
      <footer className="footer">
        <section style={{ display: 'flex' }}>
          <span> &copy; 2020 </span>
          <a href="https://www.gusvalenzuela.com">\\ Gus Valenzuela</a>
          <a href="https://github.com/gusvalenzuela/quiz-game">\\ code</a>
        </section>
        <aside>
          <a href="https://github.com/hoangvvo/nextjs-mongodb-app">
            App boiler plate
          </a>{' '}
          created by <a href="https://hoangvvo.com/">Hoang Vo</a>.
        </aside>
      </footer>
    </>
  )
}
