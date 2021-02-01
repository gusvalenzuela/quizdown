import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import SignupForm from '../components/SignupForm'
import { useCurrentUser } from '../lib/hooks'

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser()
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace('/')
  }, [user])

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <style jsx>
        {`
          h2,
          p {
            text-align: center;
            color: #fff;
          }
          h2 {
            font-size: var(--heading-2);
          }
        `}
      </style>
      <section className="container">
        <div>
          <h2>Sign up to play and begin tracking your scores!</h2>
          <SignupForm mutate={mutate} />
          <p>
            Note: The database is public. For your privacy, please avoid using
            your personal, work email.
          </p>
        </div>
      </section>
    </>
  )
}

export default SignupPage
