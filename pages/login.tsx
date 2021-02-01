import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCurrentUser } from '../lib/hooks'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  const router = useRouter()
  const [user, { mutate }] = useCurrentUser()
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/')
  }, [user, router])

  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <style jsx>
        {`
          h2 {
            text-align: center;
            color: #fff;
          }
        `}
      </style>
      <section className="container">
        <h2>Log in and play!</h2>
        <LoginForm mutate={mutate} />
      </section>
    </>
  )
}

export default LoginPage
