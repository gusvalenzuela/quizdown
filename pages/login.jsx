import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCurrentUser } from '../lib/hooks'

const LoginPage = () => {
  const router = useRouter()
  const [errorMsg, setErrorMsg] = useState('')
  const [user, { mutate }] = useCurrentUser()
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/')
  }, [user, router])

  async function onSubmit(e) {
    e.preventDefault()
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    }
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.status === 200) {
      const userObj = await res.json()
      mutate(userObj)
    } else {
      setErrorMsg('Incorrect username or password. Try again!')
    }
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <style jsx>
        {`
          section {
            background-color: #eaeaea10;
            padding: 2rem;
          }
        `}
      </style>
      <section>
        <h2>Sign in</h2>
        <form onSubmit={onSubmit}>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </label>
          <button disabled type="submit">
            Sign in
          </button>
          <Link href="/forget-password">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>Forget password</a>
          </Link>
        </form>
      </section>
    </>
  )
}

export default LoginPage
