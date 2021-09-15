import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import { useCurrentUser } from '../lib/hooks'
import SignInForm from '../components/SignInForm'

const SignInPage = () => {
  const router = useRouter()
  // const [user, { mutate }] = useCurrentUser()
  React.useEffect(() => {
    // redirect to home if user is authenticated
    router.push('/')
  }, [router])

  return (
    <>
      <Head>
        <title>Sign in</title>
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
        <h2>Sign in and play!</h2>
        <SignInForm mutate={(d: { _id: string }) => d} />
      </section>
    </>
  )
}

export default SignInPage
