import React from 'react'
import type { MouseEventHandler, MouseEvent } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Icon } from 'semantic-ui-react'
import { useCurrentUser } from '../lib/hooks'
import LogoBtn from './LogoBtn'
import Footer from './Footer'

export default function Layout({ children }) {
  const [user, { mutate }] = useCurrentUser()

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    })
    mutate(null)
  }
  function handleMenuButton(e: MouseEvent): MouseEventHandler {
    e.stopPropagation()
    const overlay = document.getElementById('overlay')
    const openMenu = document.getElementById('open-menu')
    // const closeMenu = document.getElementById('close-menu')
    openMenu.style.visibility = 'hidden' // hide open menu icon/btn
    overlay.classList.toggle('show-menu') // display menu

    function windowListener(ev: MouseEvent | any) {
      // if anything on window aside from the overlay (menu) is clicked
      // toggle menu away and redisplay open btn
      if (ev.target.id !== 'overlay') {
        overlay.classList.toggle('show-menu')
        openMenu.style.visibility = 'visible' // unhide open menu icon/btn
        return window.removeEventListener('click', windowListener)
      }
      return null
    }
    window.addEventListener('click', windowListener)

    return null
  }
  return (
    <div id="quizdownapp">
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
      <section id="nav-section">
        <button
          onClick={handleMenuButton}
          type="button"
          id="open-menu"
          className="menu-btn"
        >
          <Icon inverted name="sidebar" />
        </button>
      </section>
      <nav id="overlay">
        <LogoBtn />
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
              <Link passHref href="/user/[userId]" as={`/user/${user._id}`}>
                <button type="button">Profile</button>
              </Link>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
        <button type="button" id="close-menu" className="close-btn">
          <Icon inverted name="close" />
        </button>
      </nav>

      <main>{children}</main>
      <Footer />
    </div>
  )
}
