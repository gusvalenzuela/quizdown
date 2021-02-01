import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCurrentUser } from '../lib/hooks'
import Footer from './Footer'

export default function Layout({ children }) {
  const router = useRouter()
  const [user, { mutate }] = useCurrentUser()
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    })
    mutate(null)
  }
  return (
    <div id="myapp">
      <style jsx>
        {`
          #myapp {
            height: 100vh;
            width: 100vw;

            min-height: 600px;
            display: grid;
            grid-template-rows: auto 1fr auto;
            margin: 0;
            padding: 0;
          }
          nav {
            max-width: 800px;
            margin: auto;
            padding: 1rem 2rem;
          }
          button.sitename {
            color: #444;
            margin: 0;
            font-weight: 700;
            border: none;
            background-color: transparent;
            text-decoration: none;
            display: inline-block;
            border-bottom: 1px solid transparent;
            cursor: pointer;
            transform: scale(1);
            font-size: var(--heading-3);
          }
          .sitename {
            float: left;
          }
          .sitename:hover {
            transform: scale(1.084);
            color: #ddd;
            border-bottom: 1px solid #fff;
            transition: ease-out 0.25s;
          }
          nav:after {
            content: '';
            clear: both;
            display: table;
          }
        `}
      </style>
      <Head>
        <title>QuizDown⁉</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="QuizDown⁉ is a fun timed quiz game on the web. "
        />
        <meta property="og:title" content="QuizDown⁉ App" />
        <meta
          property="og:description"
          content="QuizDown⁉ is a fun timed quiz game on the web. "
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
      </Head>
      <header>
        <nav>
          <button
            className="sitename"
            onClick={() => {
              if (router.pathname === '/') return router.reload()
              return router.push('/')
            }}
            type="button"
          >
            QuizDown⁉
          </button>
          <div style={{ float: 'right' }}>
            {!user ? (
              <>
                <Link href="/login" passHref>
                  <button type="button">Sign in</button>
                </Link>
                <Link href="/signup" passHref>
                  <button type="button">Sign up</button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/user/[userId]" as={`/user/${user._id}`}>
                  <button type="button">Profile</button>
                </Link>
                <a tabIndex={0} role="button" onClick={handleLogout}>
                  Logout
                </a>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>{children}</main>
      <Footer />
    </div>
  )
}
